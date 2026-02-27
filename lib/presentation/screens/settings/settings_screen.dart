import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/providers/providers.dart';

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final settings = ref.watch(settingsProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildSection(context, 'Notifications', [
            _buildSwitchTile(
              context,
              'Push Notifications',
              'Receive push notifications',
              Icons.notifications,
              settings.notificationsEnabled,
              () => ref.read(settingsProvider.notifier).toggleNotifications(),
            ),
            _buildSwitchTile(
              context,
              'Email Notifications',
              'Receive email updates',
              Icons.email,
              settings.emailNotifications,
              () => ref
                  .read(settingsProvider.notifier)
                  .toggleEmailNotifications(),
            ),
            _buildSwitchTile(
              context,
              'SMS Notifications',
              'Receive SMS alerts',
              Icons.sms,
              settings.smsNotifications,
              () =>
                  ref.read(settingsProvider.notifier).toggleSmsNotifications(),
            ),
          ]),
          const SizedBox(height: 16),
          _buildSection(context, 'App Settings', [
            _buildDropdownTile(
              context,
              'Language',
              settings.language,
              Icons.language,
              ['English', 'Arabic', 'French'],
              (value) => ref
                  .read(settingsProvider.notifier)
                  .setLanguage(value ?? 'English'),
            ),
            _buildSwitchTile(
              context,
              'Dark Mode',
              'Enable dark theme',
              Icons.dark_mode,
              settings.darkMode,
              () => ref.read(settingsProvider.notifier).toggleDarkMode(),
            ),
          ]),
          const SizedBox(height: 16),
          _buildSection(context, 'Account', [
            _buildNavigationTile(context, 'Edit Profile', Icons.person, () {}),
            _buildNavigationTile(context, 'Change Password', Icons.lock, () {}),
            _buildNavigationTile(
              context,
              'Privacy Policy',
              Icons.privacy_tip,
              () {},
            ),
            _buildNavigationTile(
              context,
              'Terms of Service',
              Icons.description,
              () {},
            ),
          ]),
          const SizedBox(height: 16),
          _buildSection(context, 'Support', [
            _buildNavigationTile(context, 'Help Center', Icons.help, () {}),
            _buildNavigationTile(context, 'Contact Us', Icons.chat, () {}),
            _buildNavigationTile(
              context,
              'Report an Issue',
              Icons.bug_report,
              () {},
            ),
          ]),
          const SizedBox(height: 24),
          Text(
            'Version 1.0.0',
            textAlign: TextAlign.center,
            style: Theme.of(
              context,
            ).textTheme.bodySmall?.copyWith(color: AppColors.textTertiary),
          ),
          const SizedBox(height: 32),
        ],
      ),
    );
  }

  Widget _buildSection(
    BuildContext context,
    String title,
    List<Widget> children,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4, bottom: 8),
          child: Text(
            title,
            style: Theme.of(
              context,
            ).textTheme.titleSmall?.copyWith(color: AppColors.textSecondary),
          ),
        ),
        Container(
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(children: children),
        ),
      ],
    );
  }

  Widget _buildSwitchTile(
    BuildContext context,
    String title,
    String subtitle,
    IconData icon,
    bool value,
    VoidCallback onChanged,
  ) {
    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: AppColors.primary.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, color: AppColors.primary, size: 20),
      ),
      title: Text(title),
      subtitle: Text(
        subtitle,
        style: Theme.of(
          context,
        ).textTheme.bodySmall?.copyWith(color: AppColors.textTertiary),
      ),
      trailing: Switch(
        value: value,
        onChanged: (_) => onChanged(),
        activeColor: AppColors.primary,
      ),
    );
  }

  Widget _buildDropdownTile(
    BuildContext context,
    String title,
    String value,
    IconData icon,
    List<String> options,
    Function(String?) onChanged,
  ) {
    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: AppColors.primary.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, color: AppColors.primary, size: 20),
      ),
      title: Text(title),
      trailing: DropdownButton<String>(
        value: value,
        underline: const SizedBox(),
        items: options.map((opt) {
          return DropdownMenuItem(value: opt, child: Text(opt));
        }).toList(),
        onChanged: onChanged,
      ),
    );
  }

  Widget _buildNavigationTile(
    BuildContext context,
    String title,
    IconData icon,
    VoidCallback onTap,
  ) {
    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: AppColors.primary.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, color: AppColors.primary, size: 20),
      ),
      title: Text(title),
      trailing: const Icon(Icons.chevron_right, color: AppColors.textTertiary),
      onTap: onTap,
    );
  }
}
