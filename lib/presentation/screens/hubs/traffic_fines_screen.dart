import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/app_theme.dart';

class TrafficFinesScreen extends ConsumerStatefulWidget {
  const TrafficFinesScreen({super.key});

  @override
  ConsumerState<TrafficFinesScreen> createState() => _TrafficFinesScreenState();
}

class _TrafficFinesScreenState extends ConsumerState<TrafficFinesScreen> {
  final _plateController = TextEditingController();
  bool _isLoading = false;
  List<Map<String, dynamic>>? _fines;

  @override
  void dispose() {
    _plateController.dispose();
    super.dispose();
  }

  Future<void> _searchFines() async {
    if (_plateController.text.isEmpty) return;

    setState(() => _isLoading = true);

    await Future.delayed(const Duration(seconds: 1));

    setState(() {
      _isLoading = false;
      _fines = [
        {
          'id': 'TF001',
          'date': '2026-02-15',
          'location': 'Sheikh Zayed Road, Dubai',
          'violation': 'Speeding',
          'amount': 1000,
          'status': 'Unpaid',
        },
        {
          'id': 'TF002',
          'date': '2026-02-10',
          'location': 'Al Maktoum Road, Dubai',
          'violation': 'Red Light Violation',
          'amount': 500,
          'status': 'Unpaid',
        },
        {
          'id': 'TF003',
          'date': '2026-01-20',
          'location': 'Marina Street, Dubai',
          'violation': 'Illegal Parking',
          'amount': 200,
          'status': 'Paid',
        },
      ];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Traffic Fines')),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            color: AppColors.primary.withValues(alpha: 0.1),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Search Traffic Fines',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const SizedBox(height: 8),
                Text(
                  'Enter your vehicle plate number to check for fines',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppColors.textSecondary,
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _plateController,
                        decoration: const InputDecoration(
                          hintText: 'Enter plate number',
                          prefixIcon: Icon(Icons.directions_car),
                        ),
                        textCapitalization: TextCapitalization.characters,
                      ),
                    ),
                    const SizedBox(width: 12),
                    ElevatedButton(
                      onPressed: _isLoading ? null : _searchFines,
                      child: _isLoading
                          ? const SizedBox(
                              width: 20,
                              height: 20,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                color: Colors.white,
                              ),
                            )
                          : const Text('Search'),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Expanded(
            child: _fines == null
                ? _buildEmptyState(context)
                : _buildFinesList(context),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.search, size: 80, color: AppColors.textTertiary),
          const SizedBox(height: 16),
          Text(
            'Search for traffic fines',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SizedBox(height: 8),
          Text(
            'Enter your plate number above to check',
            style: Theme.of(
              context,
            ).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary),
          ),
        ],
      ),
    );
  }

  Widget _buildFinesList(BuildContext context) {
    final totalAmount = _fines!.fold<int>(
      0,
      (sum, fine) => sum + (fine['amount'] as int),
    );
    final unpaidCount = _fines!.where((f) => f['status'] == 'Unpaid').length;

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: unpaidCount > 0
                ? AppColors.error.withValues(alpha: 0.1)
                : AppColors.success.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildSummaryItem(
                context,
                'Total Fines',
                '${_fines!.length}',
                unpaidCount > 0 ? AppColors.error : AppColors.success,
              ),
              Container(width: 1, height: 40, color: AppColors.border),
              _buildSummaryItem(
                context,
                'Unpaid',
                '$unpaidCount',
                unpaidCount > 0 ? AppColors.error : AppColors.success,
              ),
              Container(width: 1, height: 40, color: AppColors.border),
              _buildSummaryItem(
                context,
                'Amount',
                'AED $totalAmount',
                unpaidCount > 0 ? AppColors.error : AppColors.success,
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        Text('Fine Details', style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(height: 12),
        ..._fines!.map((fine) => _buildFineItem(context, fine)).toList(),
      ],
    );
  }

  Widget _buildSummaryItem(
    BuildContext context,
    String label,
    String value,
    Color color,
  ) {
    return Column(
      children: [
        Text(
          value,
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: Theme.of(
            context,
          ).textTheme.bodySmall?.copyWith(color: AppColors.textSecondary),
        ),
      ],
    );
  }

  Widget _buildFineItem(BuildContext context, Map<String, dynamic> fine) {
    final isPaid = fine['status'] == 'Paid';

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isPaid
              ? AppColors.success.withValues(alpha: 0.3)
              : AppColors.error.withValues(alpha: 0.3),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                fine['violation'],
                style: Theme.of(context).textTheme.titleSmall,
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: isPaid
                      ? AppColors.success.withValues(alpha: 0.1)
                      : AppColors.error.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  fine['status'],
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: isPaid ? AppColors.success : AppColors.error,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              const Icon(
                Icons.location_on_outlined,
                size: 14,
                color: AppColors.textSecondary,
              ),
              const SizedBox(width: 4),
              Expanded(
                child: Text(
                  fine['location'],
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppColors.textSecondary,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Row(
            children: [
              const Icon(
                Icons.calendar_today,
                size: 14,
                color: AppColors.textSecondary,
              ),
              const SizedBox(width: 4),
              Text(
                fine['date'],
                style: Theme.of(
                  context,
                ).textTheme.bodySmall?.copyWith(color: AppColors.textSecondary),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Fine Amount',
                style: Theme.of(
                  context,
                ).textTheme.bodySmall?.copyWith(color: AppColors.textSecondary),
              ),
              Text(
                'AED ${fine['amount']}',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppColors.primary,
                ),
              ),
            ],
          ),
          if (!isPaid) ...[
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.error,
                ),
                child: const Text('Pay Now'),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
