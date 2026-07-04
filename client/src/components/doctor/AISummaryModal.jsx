const AISummaryModal = ({
  appointment,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">

      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center border-b p-6">

          <h2 className="text-2xl font-bold text-slate-800">
            Consultation Summary
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold"
          >
            ✕
          </button>

        </div>


        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">


          {/* Doctor Notes */}
          <div className="mb-8">

            <h3 className="text-xl font-bold mb-3 text-blue-700">
              Doctor Notes
            </h3>


            <pre className="whitespace-pre-wrap text-gray-700 leading-7 font-sans bg-slate-50 p-4 rounded-lg">

              {appointment?.notes ||
                "No doctor notes available."}

            </pre>

          </div>


          {/* AI Summary */}
          <div>

            <h3 className="text-xl font-bold mb-3 text-green-700">
              AI Health Summary
            </h3>


            <pre className="whitespace-pre-wrap text-gray-700 leading-7 font-sans bg-slate-50 p-4 rounded-lg">

              {appointment?.aiSummary ||
                "AI summary unavailable."}

            </pre>

          </div>


        </div>


        {/* Footer */}
        <div className="border-t p-4 flex justify-end">

          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Close
          </button>

        </div>


      </div>

    </div>
  );
};


export default AISummaryModal;