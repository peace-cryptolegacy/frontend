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
            'Transfer and distribute your assets to your loved ones.',
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
            'Don’t lose your assets again, create a backup of your funds.',
          alt: 'Backup Wallet',
          route: '/backup-wallet',
          comingSoon: false,
          planId: PlanSelection.BACKUP_WALLET,
          myPlansButtonText: 'Claim Now',
        },
        'Expender Wallet': {
          icon: '/icons/expender-wallet.png',
          title: 'Expender Wallet',
          description:
            'Create disposable wallets to admin budget or expenses safe.',
          alt: 'Expender Wallet',
          route: '/expender-wallet',
          comingSoon: true,
          planId: PlanSelection.EXPENDER_WALLET,
          myPlansButtonText: 'Claim Now',
        },
        'Migration Wallet': {
          icon: '/icons/migration-wallet.png',
          title: 'Migration Wallet',
          description:
            'Have a extra protection on your DeFi activity or emergency.',
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
    'My Plans': {
      title: 'My Plans',
      icon: '/icons/my-plans.png',
      alt: 'My Plans',
      route: '/my-plans',
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
