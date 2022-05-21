import Image from 'next/image'
export default function Footer() {
  return <footer className="p-5 bg-white">
    <div className="flex justify-center items-center">
      <p>
        Powered By
      </p>
      <a href="https://github.com/yikayiyo" className="ml-1 flex items-center">
        <Image
          alt="spotify icon"
          src="/spotify_icon.png"
          width={16}
          height={16}
        />
      </a>
    </div>
    <div className="flex justify-center">
      <p>
        Made with ❤️
      </p>
      <a href="https://github.com/yikayiyo" className="inline-box ml-1">
        by yikayiyo
      </a>
    </div>
  </footer>
}