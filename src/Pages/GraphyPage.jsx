import { useContext, useState } from "react"
import { ApiContext } from "../Context/DataContext"
import LineGraph from "../Components/LineGraph"
import { AreaGraph } from "../Components/AreaChart"
import BarGraph from "../Components/BarGraph"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { ComposedChartWithAxisLabels } from "../Components/ComposedChartWithAxisLabels"


const ButtonLoader=()=>{
    return(
        <div className="flex-col gap-4 flex items-center justify-center">
  <div className="w-5 h-5 border-4 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
    <svg viewBox="0 0 24 24" fill="currentColor" height="10px" width="10px" className="animate-ping">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
    </svg>
  </div>
</div>
    )
}
const GraphyPage = () => {
    const {globalData, typo} = useContext(ApiContext);

    const [loading, setLoading] = useState(false);

    const downloadPdf =async()=>{
        setLoading(true);
        const archer = document.querySelector("#archer");
        html2canvas(archer, {useCORS:true, logging:true, allowTaint:true}).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("landscape", "mm", "a4");

            //get the width n height of the canvas
            const imgwidth = canvas.width;
            const imgheight = canvas.height;

            //calculate the dimension to fit the image within the pdf

            const pagewidth = pdf.internal.pageSize.getWidth();
            const pageheight = pdf.internal.pageSize.getHeight();
            const ratio = Math.min(pagewidth / imgwidth, pageheight / imgheight);
            const width = imgwidth * ratio;
            const height = imgheight * ratio;

            //resize the canvas and draw the image
            const xOffset = (pagewidth - width) / 2;
            const yOffset = (pageheight - height) / 2;
            pdf.addImage(imgData, "PNG", xOffset, yOffset, width, height);
            //pdf.addImage(imgData, "PNG", 0, 0);
            pdf.save("download.pdf");
            setLoading(false);
        })
    }

  return (
    <div className=" py-5">
      <h1 className=" text-center font-semibold italic text-3xl text-gray-900">{typo}</h1>

      <div id="archer" className=" mx-auto container max-w-5xl shadow-lg p-2">
        {typo === "LineChart" ? <LineGraph data={globalData}/>
        : typo === "AreaChart" ? <AreaGraph data={globalData}/> : 
        typo === 'Composed Chart With Axis' ?  <ComposedChartWithAxisLabels/> : <BarGraph data={globalData}/>}
      </div>
      <div className="flex justify-center p-3">
        <button onClick={downloadPdf}  className="bg-indigo-400 gap-2 py-2 px-4 flex items-center text-white rounded-md">
        <h6>Download PDF</h6>
       {loading && <ButtonLoader/>}
        </button>
      </div>
    </div>
  )
}

export default GraphyPage


