import { Briefcase, FileText, Clock} from "lucide-react"

export const stats = [
    {
        key: "total Jobs",
        label: "Total Jobs",
        value: '24',
        icon: Briefcase,
        color: "bg-[#1B294B]/10 text-gray-600"
    },
    {
        key: "active Jobs",
        label: "Active Jobs",
        value: '12',
        icon: Briefcase,
        color: "bg-[#1B294B]/10 text-green-600" 
    },
    {
        key: "total applications",
        label: "Total Applications",
        value: '156',
        icon: FileText,
        color: "bg-[#1B294B]/10 text-blue-600"
    },
    {
        key: "pending review",
        label: "Pending Review",
        value: '23',
        icon: Clock,
        color: "bg-[#1B294B]/10 text-orange-600"
    }
]

export default function StatsCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-[5px] py-7 px-4 border border-[#7D7D7D]">
        <div className={`p-2 w-9 h-9 rounded-md ${color}`}>
            <Icon size={20}/>
        </div>
        <h2 className="text-[22px] font-semibold mt-4 text-[#0F1729]">{value}</h2>
        <p className="text-[14px] text-[#65748B]">{label}</p> 
    </div>
  )
}
