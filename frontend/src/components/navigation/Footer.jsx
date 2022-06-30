const Footer = () =>  {
  return (
    <footer className="absolute bottom-0 flex justify-center items-center w-full h-12 bg-black text-white text-lg">
      <p>{'All credits for the concept of the game go to '}
        <a className="text-gray-300 hover:text-white py-px border-b border-gray-300 hover:border-b-0" href="https://shop.hasbro.com/en-ca">Boggle</a>.
      </p>
    </footer>
  );
}

export default Footer;
