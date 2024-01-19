import Items from '../data/items.json'
import ItemCard from '../components/ItemCard'

export default function Home() {


  return (
    <div className='max-w-7xl mx-auto p-5'>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10 flex-wrap justify-items-center '>
        {Items.map((item)=> (
          <div key = {item.uuid} >
           <ItemCard name= {item.name} price={Number(item.price)} image={item.image}/>
          </div>
        ))}
      </div>
    </div>
  )
}
