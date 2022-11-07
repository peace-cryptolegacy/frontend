const menuItems = [
  // icon path relative to folder public
  {
    title: 'Protection',
    icon: '/icons/protection.png',
    alt: 'Protection',
    route: '/protection',
    subMenu: [
      {
        icon: '/icons/inheritance-plan.png',
        title: 'Inheritance Plan',
        description: 'Transfer and distribute your assets to your loved ones.',
        alt: 'Inheritance Plan',
        route: '/inheritancePlan',
      },
      {
        icon: '/icons/backup-wallet.png',
        title: 'Backup Wallet',
        description:
          'Don’t lose your assets again, create a backup of your funds.',
        alt: 'Backup Wallet',
        route: '/backup-wallet',
      },
      {
        icon: '/icons/expender-wallet.png',
        title: 'Expender Wallet',
        description:
          'Create disposable wallets to admin budget or expenses safe.',
        alt: 'Expender Wallet',
        route: '/expender-wallet',
        comingSoon: true,
      },
      {
        icon: '/icons/migration-wallet.png',
        title: 'Migration Wallet',
        description:
          'Have a extra protection on your DeFi activity or emergency.',
        alt: 'Migration Wallet',
        route: '/migration-wallet',
        comingSoon: true,
      },
    ],
  },
  {
    title: 'Assets',
    icon: '/icons/assets.png',
    alt: 'Assets',
    route: '/assets',
  },
  {
    title: 'Invest',
    icon: '/icons/invest.png',
    alt: 'Invest',
    route: '/invest',
  },
  {
    title: 'My Plans',
    icon: '/icons/my-plans.png',
    alt: 'My Plans',
    route: '/my-plans',
  },
  {
    title: 'Settings',
    icon: '/icons/settings.png',
    alt: 'Settings',
    route: '/settings',
  },

  {
    title: 'Help Center',
    icon: '/icons/help-center.png',
    alt: 'Help Center',
    route: '/help-center',
  },
];

export default menuItems;
