import Logo from '../assets/logo.png'
import Cart from '../assets/cart.jpg'

export default function Navbar() {
  return (
    <div>
    <div className='flex justify-between border-b-4 p-3 items-center pb-4 sticky max-w-7xl mx-auto'>
        <div className='flex items-center gap-5'>
        <img src={Logo} alt='logo' width={50} className='rounded-full'/>
        <p className='text-lg font-bold'>DEPATO</p>
        </div>

        <div>
            <img src={Cart} alt='cart'width={80}/>
        </div>
    </div>
    </div>
  )
}
