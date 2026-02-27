import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/providers/providers.dart';

class BookingConfirmationScreen extends ConsumerWidget {
  const BookingConfirmationScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final bookingState = ref.watch(bookingProvider);
    final services = ref.watch(servicesProvider);
    final vehicles = ref.watch(vehiclesProvider);
    final hubs = ref.watch(hubsProvider);

    final selectedService = services.firstWhere(
      (s) => s.id == bookingState.selectedService,
      orElse: () => services.first,
    );
    final selectedVehicle = vehicles.firstWhere(
      (v) => v.id == bookingState.selectedVehicleId,
      orElse: () => vehicles.first,
    );
    final selectedHub = hubs.firstWhere(
      (h) => h.id == bookingState.selectedHub,
      orElse: () => hubs.first,
    );

    return Scaffold(
      appBar: AppBar(
        title: const Text('Booking Confirmed'),
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: AppColors.success.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(40),
              ),
              child: const Icon(
                Icons.check_circle,
                size: 50,
                color: AppColors.success,
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'Booking Confirmed!',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 8),
            Text(
              'Your service has been booked successfully',
              style: Theme.of(
                context,
              ).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.05),
                    blurRadius: 10,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Column(
                children: [
                  _buildBookingDetail(
                    context,
                    'Service',
                    selectedService.name,
                    Icons.build,
                  ),
                  const Divider(height: 24),
                  _buildBookingDetail(
                    context,
                    'Vehicle',
                    '${selectedVehicle.make} ${selectedVehicle.model}',
                    Icons.directions_car,
                  ),
                  const Divider(height: 24),
                  _buildBookingDetail(
                    context,
                    'Date',
                    bookingState.selectedDate != null
                        ? '${bookingState.selectedDate!.day}/${bookingState.selectedDate!.month}/${bookingState.selectedDate!.year}'
                        : 'Not selected',
                    Icons.calendar_today,
                  ),
                  const Divider(height: 24),
                  _buildBookingDetail(
                    context,
                    'Time',
                    bookingState.selectedTimeSlot ?? 'Not selected',
                    Icons.access_time,
                  ),
                  const Divider(height: 24),
                  _buildBookingDetail(
                    context,
                    'Location',
                    selectedHub.name,
                    Icons.location_on,
                  ),
                  const Divider(height: 24),
                  _buildBookingDetail(
                    context,
                    'Total Price',
                    'AED ${selectedService.price}',
                    Icons.payment,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.primary.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                children: [
                  const Icon(Icons.qr_code, size: 60, color: AppColors.primary),
                  const SizedBox(height: 12),
                  Text(
                    'Booking Reference',
                    style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      color: AppColors.textSecondary,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'SM-${DateTime.now().millisecondsSinceEpoch.toString().substring(6)}',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Show this QR code at the service center',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: AppColors.textSecondary,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: () {
                ref.read(bookingProvider.notifier).reset();
                context.go('/home');
              },
              style: ElevatedButton.styleFrom(
                minimumSize: const Size(double.infinity, 50),
              ),
              child: const Text('Back to Home'),
            ),
            const SizedBox(height: 12),
            OutlinedButton(
              onPressed: () {},
              style: OutlinedButton.styleFrom(
                minimumSize: const Size(double.infinity, 50),
              ),
              child: const Text('Add to Calendar'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBookingDetail(
    BuildContext context,
    String label,
    String value,
    IconData icon,
  ) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: AppColors.primary.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, size: 20, color: AppColors.primary),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: Theme.of(
                  context,
                ).textTheme.bodySmall?.copyWith(color: AppColors.textSecondary),
              ),
              Text(value, style: Theme.of(context).textTheme.titleSmall),
            ],
          ),
        ),
      ],
    );
  }
}
