const ROICard = () => {
  return (
    <div className="flex-col w-full py-4   ">
      <div className="w-full p-0  text-white font-medium h-2/6">
        <div className="grid w-full justify-center items-center  ">
          <div className="w-full justify-start text-lg text-yellow-400 text-left p-2 ">
            $12,000
          </div>
          <div className="w-full justify-start text-right p-0  ">
            <div className="bg-custom-green rounded-xl inline-block px-2 text-sm  text-white text-right">
              3 months
            </div>
          </div>
        </div>
        <div className=""></div>
      </div>
      <div className="w-full p-4 grid border-t-[1px] border-gray-500 h-3/6 ">
        <div className="grid w-full justify-center items-center h-full  ">
          <div className="w-full justify-start text-sm text-white text-center p-0">
            ROI
          </div>
          <div className="flex-col w-full justify-start text-3xl text-yellow-400 text-center p-2 ">
            <div>40%</div>
            <div className="w-full justify-start h-full text-right  ">
              <div className="bg-custom-green rounded-xl inline-block px-2 text-sm   text-white text-center">
                $4800
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-0 grid pt-4   border-t-[1px] border-gray-500 h-1/6">
        <div className="grid w-full justify-center items-center ">
          <div className="w-full justify-start text-sm text-white text-center p-2">
            75 days left
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICard;
