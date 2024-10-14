import Image from "next/image";

const Logo = () => {
    return ( 
        <Image 
            width={100} 
            height={100} 
            alt="logo" 
            src="/adhyayan-logo.svg"
            className="rounded-full shadow-md border-2 border-white"
        >
        </Image>
    );
}
 
export default Logo;