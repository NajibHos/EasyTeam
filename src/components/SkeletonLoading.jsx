import { Skeleton } from 'primereact/skeleton';

const SkeletonLoading = () => {
  console.log('fix');
  return (
    <div className='h-[80vh] w-full flex justify-center items-center'>
      <div className='h-[70%] w-[80%] sm:max-2xl:w-[50%] flex flex-col
       justify-center items-start gap-8'>
         <Skeleton height='24px' width='100%' className="bg-zinc-200">
         </Skeleton>
         <Skeleton height='24px' width='90%' className="bg-zinc-200">
         </Skeleton>
         <Skeleton height='24px' width='80%' className="bg-zinc-200">
         </Skeleton>
         <Skeleton height='3rem' width='100%' className="bg-zinc-200">
         </Skeleton>
      </div>
    </div>
  )
}

export default SkeletonLoading;