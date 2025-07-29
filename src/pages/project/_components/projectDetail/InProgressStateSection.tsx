import RingLoader from 'react-spinners/RingLoader';

export default function InProgressStateSection() {
  return (
    <div className="shadow-custom rounded-15 p-6 w-full bg-transparent">
      <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <RingLoader color="#B3C7AA" size={80} />

        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-typography-dark">테스트 진행 중</h3>
          <p className="text-typography-gray">완료까지 몇 분 소요될 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
}
