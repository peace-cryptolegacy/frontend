import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logos/logo.png';

interface Props {
  className?: string;
}

const PeaceLogo = ({ className }: Props) => {
  return (
    <div className={className}>
      <Link href="/">
        <Image
          src={logo}
          alt="Peace Logo"
          width={156}
          height={42}
          objectFit="contain"
          className="cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default PeaceLogo;
