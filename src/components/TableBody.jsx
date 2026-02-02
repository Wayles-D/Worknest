// TableBody.jsx
export default function TableBody({ tableColumns, tableData, renderCell }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 border-b text-left text-md font-bold">#</th>
            {tableColumns.map((header) => (
              <th
                key={header.uid}
                className="px-4 py-2 border-b text-start text-md font-bold"
              >
                {header.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white">
          {tableData?.length > 0 ? (
            tableData.map((item, index) => (
              <tr
                key={item._id || item.id}
                className="hover:bg-gray-50 border-b border-gray-200"
              >
                <td className="px-4 py-2">{index + 1}</td>
                {tableColumns.map((header) => (
                  <td key={header.uid} className="px-4 py-2 text-start">
                    {renderCell ? renderCell(item, header.uid) : ""}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={tableColumns.length + 1}
                className="h-24 text-center text-gray-500"
              >
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
