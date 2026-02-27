import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/providers/providers.dart';

class LoyaltyScreen extends ConsumerWidget {
  const LoyaltyScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final loyaltyState = ref.watch(loyaltyProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Loyalty Points')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildTierCard(context, loyaltyState),
            const SizedBox(height: 24),
            _buildPointsCard(context, loyaltyState),
            const SizedBox(height: 24),
            _buildTierProgress(context, loyaltyState),
            const SizedBox(height: 24),
            Text(
              'Recent Transactions',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 12),
            ...loyaltyState.transactions.map(
              (t) => _buildTransactionItem(context, t),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTierCard(BuildContext context, LoyaltyState state) {
    Color tierColor;
    IconData tierIcon;

    switch (state.tier) {
      case 'Gold':
        tierColor = AppColors.loyaltyGold;
        tierIcon = Icons.workspace_premium;
        break;
      case 'Silver':
        tierColor = AppColors.loyaltySilver;
        tierIcon = Icons.workspace_premium;
        break;
      default:
        tierColor = AppColors.loyaltyBronze;
        tierIcon = Icons.workspace_premium;
    }

    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [tierColor, tierColor.withValues(alpha: 0.7)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: tierColor.withValues(alpha: 0.4),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        children: [
          Icon(tierIcon, size: 60, color: Colors.white),
          const SizedBox(height: 12),
          Text(
            '${state.tier} Member',
            style: const TextStyle(
              color: Colors.white,
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            _getTierBenefits(state.tier),
            style: TextStyle(
              color: Colors.white.withValues(alpha: 0.9),
              fontSize: 14,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  String _getTierBenefits(String tier) {
    switch (tier) {
      case 'Gold':
        return '15% off • Free delivery • Priority booking';
      case 'Silver':
        return '10% off • Free wash monthly';
      default:
        return '5% off on all services';
    }
  }

  Widget _buildPointsCard(BuildContext context, LoyaltyState state) {
    return Container(
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
          Text(
            'Available Points',
            style: Theme.of(
              context,
            ).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary),
          ),
          const SizedBox(height: 8),
          Text(
            '${state.points}',
            style: Theme.of(context).textTheme.headlineLarge?.copyWith(
              fontWeight: FontWeight.bold,
              color: AppColors.primary,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: ElevatedButton(
                  onPressed: () {},
                  child: const Text('Earn Points'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: OutlinedButton(
                  onPressed: state.points > 0 ? () {} : null,
                  child: const Text('Redeem'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTierProgress(BuildContext context, LoyaltyState state) {
    if (state.tier == 'Gold') {
      return Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.success.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            const Icon(Icons.celebration, color: AppColors.success),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                'You\'ve reached the highest tier! Enjoy all benefits.',
                style: Theme.of(
                  context,
                ).textTheme.bodyMedium?.copyWith(color: AppColors.success),
              ),
            ),
          ],
        ),
      );
    }

    final progress =
        1 - (state.pointsToNextTier / _getPointsForNextTier(state.tier));

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Progress to ${_getNextTier(state.tier)}',
              style: Theme.of(context).textTheme.titleSmall,
            ),
            Text(
              '${state.pointsToNextTier} points to go',
              style: Theme.of(
                context,
              ).textTheme.bodySmall?.copyWith(color: AppColors.textSecondary),
            ),
          ],
        ),
        const SizedBox(height: 12),
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: LinearProgressIndicator(
            value: progress.clamp(0.0, 1.0),
            minHeight: 12,
            backgroundColor: AppColors.border,
            valueColor: const AlwaysStoppedAnimation(AppColors.primary),
          ),
        ),
      ],
    );
  }

  int _getPointsForNextTier(String current) {
    switch (current) {
      case 'Bronze':
        return 1000;
      case 'Silver':
        return 4000;
      default:
        return 5000;
    }
  }

  String _getNextTier(String current) {
    switch (current) {
      case 'Bronze':
        return 'Silver';
      case 'Silver':
        return 'Gold';
      default:
        return 'Gold';
    }
  }

  Widget _buildTransactionItem(
    BuildContext context,
    LoyaltyTransaction transaction,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: transaction.isEarned
                  ? AppColors.success.withValues(alpha: 0.1)
                  : AppColors.error.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(
              transaction.isEarned ? Icons.add : Icons.remove,
              color: transaction.isEarned ? AppColors.success : AppColors.error,
              size: 20,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  transaction.description,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
                Text(
                  '${transaction.date.day}/${transaction.date.month}/${transaction.date.year}',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppColors.textTertiary,
                  ),
                ),
              ],
            ),
          ),
          Text(
            '${transaction.isEarned ? '+' : ''}${transaction.points}',
            style: TextStyle(
              color: transaction.isEarned ? AppColors.success : AppColors.error,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
