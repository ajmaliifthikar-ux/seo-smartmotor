import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

class AuthState {
  final bool isAuthenticated;
  final String? userId;
  final String? userName;
  final String? userEmail;
  final String? userPhone;
  final String? profileImageUrl;
  final bool isLoading;
  final String? error;

  const AuthState({
    this.isAuthenticated = false,
    this.userId,
    this.userName,
    this.userEmail,
    this.userPhone,
    this.profileImageUrl,
    this.isLoading = false,
    this.error,
  });

  AuthState copyWith({
    bool? isAuthenticated,
    String? userId,
    String? userName,
    String? userEmail,
    String? userPhone,
    String? profileImageUrl,
    bool? isLoading,
    String? error,
  }) {
    return AuthState(
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      userId: userId ?? this.userId,
      userName: userName ?? this.userName,
      userEmail: userEmail ?? this.userEmail,
      userPhone: userPhone ?? this.userPhone,
      profileImageUrl: profileImageUrl ?? this.profileImageUrl,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  AuthNotifier() : super(const AuthState());

  Future<bool> login(String email, String password) async {
    state = state.copyWith(isLoading: true, error: null);

    await Future.delayed(const Duration(seconds: 1));

    if (email.isNotEmpty && password.isNotEmpty) {
      state = state.copyWith(
        isAuthenticated: true,
        userId: 'user_123',
        userName: 'John Doe',
        userEmail: email,
        userPhone: '+971501234567',
        isLoading: false,
      );
      return true;
    } else {
      state = state.copyWith(
        isLoading: false,
        error: 'Invalid email or password',
      );
      return false;
    }
  }

  Future<bool> register(
    String name,
    String email,
    String password,
    String phone,
  ) async {
    state = state.copyWith(isLoading: true, error: null);

    await Future.delayed(const Duration(seconds: 1));

    if (name.isNotEmpty &&
        email.isNotEmpty &&
        password.isNotEmpty &&
        phone.isNotEmpty) {
      state = state.copyWith(
        isAuthenticated: true,
        userId: 'user_123',
        userName: name,
        userEmail: email,
        userPhone: phone,
        isLoading: false,
      );
      return true;
    } else {
      state = state.copyWith(
        isLoading: false,
        error: 'Please fill in all fields',
      );
      return false;
    }
  }

  Future<bool> resetPassword(String email) async {
    state = state.copyWith(isLoading: true, error: null);

    await Future.delayed(const Duration(seconds: 1));

    state = state.copyWith(isLoading: false);
    return true;
  }

  void logout() {
    state = const AuthState();
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier();
});

class Vehicle {
  final String id;
  final String make;
  final String model;
  final int year;
  final String plateNumber;
  final String color;
  final String? imageUrl;

  const Vehicle({
    required this.id,
    required this.make,
    required this.model,
    required this.year,
    required this.plateNumber,
    required this.color,
    this.imageUrl,
  });
}

class VehiclesNotifier extends StateNotifier<List<Vehicle>> {
  VehiclesNotifier()
    : super([
        const Vehicle(
          id: 'v1',
          make: 'Toyota',
          model: 'Camry',
          year: 2023,
          plateNumber: 'A12345',
          color: 'White',
        ),
        const Vehicle(
          id: 'v2',
          make: 'Honda',
          model: 'Accord',
          year: 2022,
          plateNumber: 'B67890',
          color: 'Black',
        ),
      ]);

  void addVehicle(Vehicle vehicle) {
    state = [...state, vehicle];
  }

  void updateVehicle(Vehicle vehicle) {
    state = state.map((v) => v.id == vehicle.id ? vehicle : v).toList();
  }

  void removeVehicle(String id) {
    state = state.where((v) => v.id != id).toList();
  }
}

final vehiclesProvider = StateNotifierProvider<VehiclesNotifier, List<Vehicle>>(
  (ref) {
    return VehiclesNotifier();
  },
);

class BookingState {
  final String? selectedService;
  final String? selectedVehicleId;
  final DateTime? selectedDate;
  final String? selectedTimeSlot;
  final String? selectedHub;
  final String? notes;
  final bool isLoading;
  final String? error;

  const BookingState({
    this.selectedService,
    this.selectedVehicleId,
    this.selectedDate,
    this.selectedTimeSlot,
    this.selectedHub,
    this.notes,
    this.isLoading = false,
    this.error,
  });

  BookingState copyWith({
    String? selectedService,
    String? selectedVehicleId,
    DateTime? selectedDate,
    String? selectedTimeSlot,
    String? selectedHub,
    String? notes,
    bool? isLoading,
    String? error,
  }) {
    return BookingState(
      selectedService: selectedService ?? this.selectedService,
      selectedVehicleId: selectedVehicleId ?? this.selectedVehicleId,
      selectedDate: selectedDate ?? this.selectedDate,
      selectedTimeSlot: selectedTimeSlot ?? this.selectedTimeSlot,
      selectedHub: selectedHub ?? this.selectedHub,
      notes: notes ?? this.notes,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }

  bool get isComplete =>
      selectedService != null &&
      selectedVehicleId != null &&
      selectedDate != null &&
      selectedTimeSlot != null &&
      selectedHub != null;
}

class BookingNotifier extends StateNotifier<BookingState> {
  BookingNotifier() : super(const BookingState());

  void selectService(String service) {
    state = state.copyWith(selectedService: service);
  }

  void selectVehicle(String vehicleId) {
    state = state.copyWith(selectedVehicleId: vehicleId);
  }

  void selectDate(DateTime date) {
    state = state.copyWith(selectedDate: date);
  }

  void selectTimeSlot(String timeSlot) {
    state = state.copyWith(selectedTimeSlot: timeSlot);
  }

  void selectHub(String hub) {
    state = state.copyWith(selectedHub: hub);
  }

  void setNotes(String notes) {
    state = state.copyWith(notes: notes);
  }

  void reset() {
    state = const BookingState();
  }
}

final bookingProvider = StateNotifierProvider<BookingNotifier, BookingState>((
  ref,
) {
  return BookingNotifier();
});

class LoyaltyState {
  final int points;
  final String tier;
  final int pointsToNextTier;
  final List<LoyaltyTransaction> transactions;

  const LoyaltyState({
    this.points = 2500,
    this.tier = 'Gold',
    this.pointsToNextTier = 2500,
    this.transactions = const [],
  });

  LoyaltyState copyWith({
    int? points,
    String? tier,
    int? pointsToNextTier,
    List<LoyaltyTransaction>? transactions,
  }) {
    return LoyaltyState(
      points: points ?? this.points,
      tier: tier ?? this.tier,
      pointsToNextTier: pointsToNextTier ?? this.pointsToNextTier,
      transactions: transactions ?? this.transactions,
    );
  }
}

class LoyaltyTransaction {
  final String id;
  final String description;
  final int points;
  final DateTime date;
  final bool isEarned;

  const LoyaltyTransaction({
    required this.id,
    required this.description,
    required this.points,
    required this.date,
    required this.isEarned,
  });
}

class LoyaltyNotifier extends StateNotifier<LoyaltyState> {
  LoyaltyNotifier()
    : super(
        const LoyaltyState(
          transactions: [
            LoyaltyTransaction(
              id: 't1',
              description: 'Car Wash - Marina Mall',
              points: 150,
              date: DateTime(2026, 2, 20),
              isEarned: true,
            ),
            LoyaltyTransaction(
              id: 't2',
              description: 'Oil Change - Service Center',
              points: 200,
              date: DateTime(2026, 2, 15),
              isEarned: true,
            ),
            LoyaltyTransaction(
              id: 't3',
              description: 'Points Redeemed',
              points: -500,
              date: DateTime(2026, 2, 10),
              isEarned: false,
            ),
          ],
        ),
      );

  void addPoints(int points) {
    final newPoints = state.points + points;
    String newTier = state.tier;
    int newPointsToNext = state.pointsToNextTier;

    if (newTier == 'Bronze' && newPoints >= 1000) {
      newTier = 'Silver';
      newPointsToNext = 4000 - newPoints;
    } else if (newTier == 'Silver' && newPoints >= 5000) {
      newTier = 'Gold';
      newPointsToNext = 0;
    } else if (newTier != 'Gold') {
      newPointsToNext = state.pointsToNextTier - points;
    }

    state = state.copyWith(
      points: newPoints,
      tier: newTier,
      pointsToNextTier: newPointsToNext > 0 ? newPointsToNext : 0,
    );
  }

  void redeemPoints(int points) {
    state = state.copyWith(points: state.points - points);
  }
}

final loyaltyProvider = StateNotifierProvider<LoyaltyNotifier, LoyaltyState>((
  ref,
) {
  return LoyaltyNotifier();
});

class Hub {
  final String id;
  final String name;
  final String address;
  final String phone;
  final double rating;
  final String imageUrl;
  final List<String> services;
  final bool isOpen;

  const Hub({
    required this.id,
    required this.name,
    required this.address,
    required this.phone,
    required this.rating,
    required this.imageUrl,
    required this.services,
    required this.isOpen,
  });
}

final hubsProvider = Provider<List<Hub>>((ref) {
  return const [
    Hub(
      id: 'h1',
      name: 'Smart Motor - Dubai Marina',
      address: 'Dubai Marina Mall, Ground Floor',
      phone: '+971 4 123 4567',
      rating: 4.8,
      imageUrl: 'https://example.com/marina.jpg',
      services: ['Car Wash', 'Oil Change', 'Tire Service', 'Detailing'],
      isOpen: true,
    ),
    Hub(
      id: 'h2',
      name: 'Smart Motor - Mall of Emirates',
      address: 'Mall of Emirates, Level 2',
      phone: '+971 4 234 5678',
      rating: 4.6,
      imageUrl: 'https://example.com/emirates.jpg',
      services: ['Car Wash', 'Detailing', 'Polish'],
      isOpen: true,
    ),
    Hub(
      id: 'h3',
      name: 'Smart Motor - Abu Dhabi',
      address: 'Marina Mall, Abu Dhabi',
      phone: '+971 2 345 6789',
      rating: 4.9,
      imageUrl: 'https://example.com/ad.jpg',
      services: [
        'Car Wash',
        'Oil Change',
        'Tire Service',
        'Detailing',
        'Repair',
      ],
      isOpen: false,
    ),
  ];
});

class Service {
  final String id;
  final String name;
  final String description;
  final double price;
  final String icon;
  final int duration;

  const Service({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.icon,
    required this.duration,
  });
}

final servicesProvider = Provider<List<Service>>((ref) {
  return const [
    Service(
      id: 's1',
      name: 'Car Wash',
      description: 'Exterior and interior cleaning',
      price: 99,
      icon: 'car_wash',
      duration: 30,
    ),
    Service(
      id: 's2',
      name: 'Oil Change',
      description: 'Full synthetic oil change',
      price: 250,
      icon: 'oil_change',
      duration: 45,
    ),
    Service(
      id: 's3',
      name: 'Detailing',
      description: 'Premium interior & exterior detailing',
      price: 499,
      icon: 'detailing',
      duration: 120,
    ),
    Service(
      id: 's4',
      name: 'Tire Service',
      description: 'Rotation, balance & pressure check',
      price: 150,
      icon: 'tire',
      duration: 30,
    ),
    Service(
      id: 's5',
      name: 'Polish',
      description: 'High-gloss paint polish',
      price: 299,
      icon: 'polish',
      duration: 60,
    ),
    Service(
      id: 's6',
      name: 'AC Service',
      description: 'AC inspection and refill',
      price: 199,
      icon: 'ac',
      duration: 45,
    ),
  ];
});

class SettingsState {
  final bool notificationsEnabled;
  final bool emailNotifications;
  final bool smsNotifications;
  final String language;
  final bool darkMode;

  const SettingsState({
    this.notificationsEnabled = true,
    this.emailNotifications = true,
    this.smsNotifications = true,
    this.language = 'English',
    this.darkMode = false,
  });

  SettingsState copyWith({
    bool? notificationsEnabled,
    bool? emailNotifications,
    bool? smsNotifications,
    String? language,
    bool? darkMode,
  }) {
    return SettingsState(
      notificationsEnabled: notificationsEnabled ?? this.notificationsEnabled,
      emailNotifications: emailNotifications ?? this.emailNotifications,
      smsNotifications: smsNotifications ?? this.smsNotifications,
      language: language ?? this.language,
      darkMode: darkMode ?? this.darkMode,
    );
  }
}

class SettingsNotifier extends StateNotifier<SettingsState> {
  SettingsNotifier() : super(const SettingsState());

  void toggleNotifications() {
    state = state.copyWith(notificationsEnabled: !state.notificationsEnabled);
  }

  void toggleEmailNotifications() {
    state = state.copyWith(emailNotifications: !state.emailNotifications);
  }

  void toggleSmsNotifications() {
    state = state.copyWith(smsNotifications: !state.smsNotifications);
  }

  void setLanguage(String language) {
    state = state.copyWith(language: language);
  }

  void toggleDarkMode() {
    state = state.copyWith(darkMode: !state.darkMode);
  }
}

final settingsProvider = StateNotifierProvider<SettingsNotifier, SettingsState>(
  (ref) {
    return SettingsNotifier();
  },
);

final selectedIndexProvider = StateProvider<int>((ref) => 0);
