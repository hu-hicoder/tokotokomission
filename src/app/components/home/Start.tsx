import Link from 'next/link'

const Start = () => {
  return (
    <div>
      <div className="pt-[140px] pb-[140px]">
            <div className="container flex justify-center">
                <div className="w-full lg:w-[80%]">
                    <div className="text-center">
                      {/* 入力画面に遷移するためのスタートボタン
                      ログインを促すように変更する可能性あり) */}
                      <Link 
                        href="/"
                        className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition"
                      >
                        はじめる
                      </Link> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Start