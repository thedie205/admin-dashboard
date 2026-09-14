import { SalesByAge } from "./components";

export default function Dashboard() {
  return (
    <main>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3 space-y-5 bg-gray-50 p-6">
        <div className="lg:col-span-2 space-x-0 lg:space-x-5 space-y-5">
          <div className="bg-red-500 w-full h-1/2 "></div>
          <div className="w-full h-1/2 p-2 ">
            <SalesByAge />
          </div>
        </div>
        <div className="bg-blue-200 col-span-1 "></div>
      </div>
    </main>
  )
}

