import { PlanSelection } from 'utils/constants/PlanSelection';

const menuItems =
  // icon path relative to folder public
  {
    Protection: {
      title: 'Protection',
      icon: '/icons/protection.png',
      alt: 'Protection',
      route: '/protection',
      subMenu: {
        'Inheritance Plan': {
          icon: '/icons/inheritance-plan.png',
          title: 'Inheritance Plan',
          description:
            'Transfer your assets to your loved ones in case of emergency.',
          alt: 'Inheritance Plan',
          route: '/inheritancePlan',
          comingSoon: false,
          planId: PlanSelection.INHERITANCE,
          myPlansButtonText: 'Complete Multisig',
        },
        'Backup Wallet': {
          icon: '/icons/backup-wallet.png',
          title: 'Backup Wallet',
          description:
            'Never lose your assets again. Create a backup of your funds.',
          alt: 'Backup Wallet',
          route: '/backup-wallet',
          comingSoon: true,
          planId: PlanSelection.BACKUP_WALLET,
          myPlansButtonText: 'Claim Now',
        },
        'Expender Wallet': {
          icon: '/icons/expender-wallet.png',
          title: 'Expender Wallet',
          description:
            'Disposable wallets to overview expenses and protect assets.',
          alt: 'Expender Wallet',
          route: '/expender-wallet',
          comingSoon: true,
          planId: PlanSelection.EXPENDER_WALLET,
          myPlansButtonText: 'Claim Now',
        },
        'Migration Plan': {
          icon: '/icons/migration-wallet.png',
          title: 'Migration Plan',
          description: 'An extra layer of security for your DEFI activity.',
          alt: 'Migration Wallet',
          route: '/migration-wallet',
          comingSoon: true,
          planId: PlanSelection.MIGRATION_WALLET,
          myPlansButtonText: 'Claim Now',
        },
      },
    },
    Assets: {
      title: 'Assets',
      icon: '/icons/assets.png',
      alt: 'Assets',
      route: '/assets',
    },
    Invest: {
      title: 'Invest',
      icon: '/icons/invest.png',
      alt: 'Invest',
      route: '/invest',
    },
    Recovery: {
      title: 'Recovery',
      icon: '/icons/my-plans.png',
      alt: 'Recovery',
      route: '/recovery',
    },
    Settings: {
      title: 'Settings',
      icon: '/icons/settings.png',
      alt: 'Settings',
      route: '/settings',
    },

    'Help Center': {
      title: 'Help Center',
      icon: '/icons/help-center.png',
      alt: 'Help Center',
      route: '/help-center',
    },
  };

export default menuItems;
