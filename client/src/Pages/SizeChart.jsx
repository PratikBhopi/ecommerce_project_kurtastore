import useUIStore from '../store/useUIStore';
import { MdCancel } from "react-icons/md";

const SizeChart = () => {

  const {isOpen,onClose} = useUIStore()
  return (
    <> 
      <div className='absolute w-screen h-screen  z-[9999] flex justify-center items-center bg-[white] top-[23%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div className=' md:w-[50vw] w-screen px-4  py-4 flex flex-col justify-center items-center '>
        <div onClick={onClose} className='flex justify-end py-3 w-full'><MdCancel  className='scale-[1.2]'/></div>
        <div className='min:w-[250px]'><img className='w-full' src="/sizechart.png" alt="" /></div>
         
        </div>
      </div>
      </>

  )
}

export default SizeChart
