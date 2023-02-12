import { NextPage } from 'next';

const HelpCenter: NextPage = () => {
  return (
    // We calc the left position of the text to be half of the screen width minus the width of the menu
    <h1 className="h1 text-gradient absolute !font-black inset-center lg:!left-[calc(50%+125px)]">
      COMING SOON
    </h1>
  );
};

export default HelpCenter;
