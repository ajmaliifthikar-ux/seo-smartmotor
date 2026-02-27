import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/providers/providers.dart';

class AddVehicleScreen extends ConsumerStatefulWidget {
  final String? editId;

  const AddVehicleScreen({super.key, this.editId});

  @override
  ConsumerState<AddVehicleScreen> createState() => _AddVehicleScreenState();
}

class _AddVehicleScreenState extends ConsumerState<AddVehicleScreen> {
  final _formKey = GlobalKey<FormState>();
  final _makeController = TextEditingController();
  final _modelController = TextEditingController();
  final _plateController = TextEditingController();
  final _colorController = TextEditingController();
  int _selectedYear = DateTime.now().year;
  bool _isLoading = false;

  final List<String> _carMakes = [
    'Toyota',
    'Honda',
    'BMW',
    'Mercedes',
    'Audi',
    'Lexus',
    'Ford',
    'Chevrolet',
  ];
  final List<String> _carColors = [
    'White',
    'Black',
    'Silver',
    'Grey',
    'Red',
    'Blue',
    'Green',
    'Gold',
  ];

  @override
  void initState() {
    super.initState();
    if (widget.editId != null) {
      _loadVehicle();
    }
  }

  void _loadVehicle() {
    final vehicles = ref.read(vehiclesProvider);
    final vehicle = vehicles.firstWhere(
      (v) => v.id == widget.editId,
      orElse: () => vehicles.first,
    );
    _makeController.text = vehicle.make;
    _modelController.text = vehicle.model;
    _plateController.text = vehicle.plateNumber;
    _colorController.text = vehicle.color;
    _selectedYear = vehicle.year;
  }

  @override
  void dispose() {
    _makeController.dispose();
    _modelController.dispose();
    _plateController.dispose();
    _colorController.dispose();
    super.dispose();
  }

  Future<void> _saveVehicle() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    await Future.delayed(const Duration(milliseconds: 500));

    final vehicle = Vehicle(
      id: widget.editId ?? 'v${DateTime.now().millisecondsSinceEpoch}',
      make: _makeController.text,
      model: _modelController.text,
      year: _selectedYear,
      plateNumber: _plateController.text.toUpperCase(),
      color: _colorController.text,
    );

    if (widget.editId != null) {
      ref.read(vehiclesProvider.notifier).updateVehicle(vehicle);
    } else {
      ref.read(vehiclesProvider.notifier).addVehicle(vehicle);
    }

    setState(() => _isLoading = false);

    if (mounted) {
      context.pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.editId != null ? 'Edit Vehicle' : 'Add Vehicle'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                height: 120,
                decoration: BoxDecoration(
                  color: AppColors.primary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: const Center(
                  child: Icon(
                    Icons.directions_car,
                    size: 60,
                    color: AppColors.primary,
                  ),
                ),
              ),
              const SizedBox(height: 24),
              DropdownButtonFormField<String>(
                value: _makeController.text.isEmpty
                    ? null
                    : _makeController.text,
                decoration: const InputDecoration(
                  labelText: 'Make',
                  prefixIcon: Icon(Icons.business),
                ),
                items: _carMakes.map((make) {
                  return DropdownMenuItem(value: make, child: Text(make));
                }).toList(),
                onChanged: (value) {
                  _makeController.text = value ?? '';
                },
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please select a make';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _modelController,
                decoration: const InputDecoration(
                  labelText: 'Model',
                  prefixIcon: Icon(Icons.car_rental),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter model';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<int>(
                value: _selectedYear,
                decoration: const InputDecoration(
                  labelText: 'Year',
                  prefixIcon: Icon(Icons.calendar_today),
                ),
                items: List.generate(10, (index) {
                  final year = DateTime.now().year - index;
                  return DropdownMenuItem(value: year, child: Text('$year'));
                }),
                onChanged: (value) {
                  setState(() => _selectedYear = value ?? DateTime.now().year);
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _plateController,
                decoration: const InputDecoration(
                  labelText: 'Plate Number',
                  prefixIcon: Icon(Icons.confirmation_number),
                ),
                textCapitalization: TextCapitalization.characters,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter plate number';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<String>(
                value: _carColors.contains(_colorController.text)
                    ? _colorController.text
                    : null,
                decoration: const InputDecoration(
                  labelText: 'Color',
                  prefixIcon: Icon(Icons.palette),
                ),
                items: _carColors.map((color) {
                  return DropdownMenuItem(value: color, child: Text(color));
                }).toList(),
                onChanged: (value) {
                  _colorController.text = value ?? '';
                },
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please select color';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: _isLoading ? null : _saveVehicle,
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 50),
                ),
                child: _isLoading
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: Colors.white,
                        ),
                      )
                    : Text(
                        widget.editId != null
                            ? 'Update Vehicle'
                            : 'Add Vehicle',
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
