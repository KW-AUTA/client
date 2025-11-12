import RingLoader from 'react-spinners/RingLoader';

export default function InProgressStateSection() {
  return (
    <div className="bg-white/80 backdrop-blur-lg ring-1 ring-white/40 shadow-md rounded-2xl p-6 w-full">
      <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <RingLoader color="#5CA585" size={80} />

        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-typography-dark">테스트 진행 중</h3>
          <p className="text-typography-gray">완료까지 몇 분 소요될 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
}
