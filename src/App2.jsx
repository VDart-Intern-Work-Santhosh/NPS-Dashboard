import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Filter, Users, Send, TrendingUp, X, Star, Download, Target, CheckCircle, Briefcase } from 'lucide-react';

// Sample survey data (no changes)
const surveyData = [
    {
        id: 1, bu: 'Sidd', name: 'John Smith', client: 'TechCorp Inc', function: 'HR', sent: true, received: true,
        responses: { q1: 4, q2: ['Talent Availability', 'Hiring Speed'], q3: 5, q4: 3, q5: 4, q6: 'No', q7: 5, q8: 'Monthly', q9: 10, q10: 'VDart is among the top vendors we work with', q11: ['Quality of Candidates', 'Speed of Hiring'], q12: 'Yes', q13: 'Yes, I am fully aware of VDart\'s global presence' }
    },
    {
        id: 2, bu: 'Rohit', name: 'Sarah Johnson', client: 'FinanceFlow Ltd', function: 'Procurement', sent: true, received: true,
        responses: { q1: 3, q2: ['Cost Control', 'Candidate Quality'], q3: 4, q4: 4, q5: 3, q6: 'Yes', q7: 4, q8: 'Bi-Weekly', q9: 9, q10: 'VDart is our number one preferred staffing partner', q11: ['Pricing and Value', 'Transparency and Communication'], q12: 'No', q13: 'I had some idea, but was not fully aware' }
    },
    {
        id: 3, bu: 'Nambu', name: 'Mike Chen', client: 'DataSystems Corp', function: 'HR', sent: true, received: true,
        responses: { q1: 5, q2: ['Industry-Specific Hiring Challenges'], q3: 5, q4: 5, q5: 5, q6: 'No', q7: 5, q8: 'Weekly', q9: 9, q10: 'VDart is our number one preferred staffing partner', q11: ['Quality of Candidates', 'Innovation in Recruitment Processes'], q12: 'Yes', q13: 'Yes, I am fully aware of VDart\'s global presence' }
    },
    {
        id: 4, bu: 'Vinay', name: 'Lisa Rodriguez', client: 'HealthTech Solutions', function: 'Procurement', sent: true, received: false, responses: null
    },
    {
        id: 5, bu: 'Sidd', name: 'David Kim', client: 'RetailMax Inc', function: 'HR', sent: true, received: true,
        responses: { q1: 2, q2: ['Talent Availability', 'Cost Control'], q3: 3, q4: 2, q5: 3, q6: 'Yes', q7: 3, q8: 'Rarely', q9: 8, q10: 'VDart is similar to other vendors we use', q11: ['Pricing and Value'], q12: 'No', q13: 'No, I thought VDart only operated in North America' }
    },
    {
        id: 6, bu: 'Rohit', name: 'Emma Wilson', client: 'ManufacturingPro', function: 'HR', sent: true, received: true,
        responses: { q1: 4, q2: ['Hiring Speed', 'Candidate Quality'], q3: 4, q4: 4, q5: 4, q6: 'No', q7: 4, q8: 'Monthly', q9: 8, q10: 'VDart is among the top vendors we work with', q11: ['Quality of Candidates', 'Transparency and Communication'], q12: 'Yes', q13: 'I had some idea, but was not fully aware' }
    },
    {
        id: 7, bu: 'Nambu', name: 'Alex Thompson', client: 'EcoEnergy Corp', function: 'Procurement', sent: true, received: true,
        responses: { q1: 5, q2: ['Innovation'], q3: 5, q4: 4, q5: 5, q6: 'No', q7: 5, q8: 'Weekly', q9: 10, q10: 'VDart is our number one preferred staffing partner', q11: ['Quality of Candidates', 'Innovation in Recruitment Processes'], q12: 'Yes', q13: 'Yes, I am fully aware of VDart\'s global presence' }
    },
    {
        id: 8, bu: 'Vinay', name: 'Maria Gonzalez', client: 'GlobalTech Inc', function: 'HR', sent: true, received: true,
        responses: { q1: 3, q2: ['Talent Availability', 'Industry-Specific Hiring Challenges'], q3: 4, q4: 3, q5: 3, q6: 'Yes', q7: 4, q8: 'Bi-Weekly', q9: 8, q10: 'VDart is similar to other vendors we use', q11: ['Cost Control', 'Quality of Candidates'], q12: 'No', q13: 'I had some idea, but was not fully aware' }
    },
    {
        id: 9, bu: 'Sidd', name: 'Robert Taylor', client: 'InnovateTech', function: 'Procurement', sent: true, received: true,
        responses: { q1: 4, q2: ['Hiring Speed', 'Cost Control'], q3: 4, q4: 3, q5: 4, q6: 'No', q7: 4, q8: 'Monthly', q9: 7, q10: 'VDart is among the top vendors we work with', q11: ['Speed of Hiring', 'Pricing and Value'], q12: 'Yes', q13: 'Yes, I am fully aware of VDart\'s global presence' }
    },
    {
        id: 10, bu: 'Rohit', name: 'Jennifer Lee', client: 'BioMed Solutions', function: 'HR', sent: true, received: true,
        responses: { q1: 5, q2: ['Candidate Quality', 'Industry-Specific Hiring Challenges'], q3: 5, q4: 5, q5: 4, q6: 'No', q7: 5, q8: 'Weekly', q9: 9, q10: 'VDart is our number one preferred staffing partner', q11: ['Quality of Candidates', 'Innovation in Recruitment Processes'], q12: 'Yes', q13: 'Yes, I am fully aware of VDart\'s global presence' }
    },
    {
        id: 11, bu: 'Nambu', name: 'James Brown', client: 'FinanceMax Corp', function: 'Procurement', sent: true, received: true,
        responses: { q1: 3, q2: ['Cost Control', 'Talent Availability'], q3: 3, q4: 4, q5: 3, q6: 'Yes', q7: 3, q8: 'Occasionally', q9: 6, q10: 'VDart is similar to other vendors we use', q11: ['Pricing and Value', 'Scope of Services Offered'], q12: 'No', q13: 'I had some idea, but was not fully aware' }
    },
    {
        id: 12, bu: 'Vinay', name: 'Amanda Davis', client: 'TechFlow Industries', function: 'HR', sent: true, received: true,
        responses: { q1: 4, q2: ['Hiring Speed', 'Candidate Quality'], q3: 4, q4: 4, q5: 4, q6: 'No', q7: 4, q8: 'Bi-Weekly', q9: 8, q10: 'VDart is among the top vendors we work with', q11: ['Quality of Candidates', 'Speed of Hiring'], q12: 'Yes', q13: 'Yes, I am fully aware of VDart\'s global presence' }
    },
    {
        id: 13, bu: 'Sidd', name: 'Michael Johnson', client: 'CloudSys Ltd', function: 'HR', sent: true, received: true,
        responses: { q1: 1, q2: ['Talent Availability', 'Cost Control'], q3: 2, q4: 1, q5: 2, q6: 'Yes', q7: 2, q8: 'Rarely', q9: 3, q10: 'VDart is similar to other vendors we use', q11: ['Pricing and Value'], q12: 'No', q13: 'No, I thought VDart only operated in North America' }
    },
    {
        id: 14, bu: 'Rohit', name: 'Linda Garcia', client: 'MediaTech Corp', function: 'Procurement', sent: true, received: true,
        responses: { q1: 5, q2: ['Innovation', 'Quality'], q3: 5, q4: 5, q5: 5, q6: 'No', q7: 5, q8: 'Weekly', q9: 10, q10: 'VDart is our number one preferred staffing partner', q11: ['Quality of Candidates', 'Innovation in Recruitment Processes'], q12: 'Yes', q13: 'Yes, I am fully aware of VDart\'s global presence' }
    },
    {
        id: 15, bu: 'Nambu', name: 'Kevin Martinez', client: 'AutoTech Systems', function: 'HR', sent: true, received: true,
        responses: { q1: 2, q2: ['Talent Availability', 'Cost Control'], q3: 2, q4: 3, q5: 2, q6: 'Yes', q7: 2, q8: 'Rarely', q9: 4, q10: 'VDart is similar to other vendors we use', q11: ['Pricing and Value'], q12: 'No', q13: 'No, I thought VDart only operated in North America' }
    },
    {
        id: 16, bu: 'Sidd', name: 'Patricia White', client: 'DataFlow Corp', function: 'HR', sent: true, received: true,
        responses: { q1: 3, q2: ['Hiring Speed', 'Candidate Quality'], q3: 3, q4: 3, q5: 3, q6: 'No', q7: 3, q8: 'Monthly', q9: 6, q10: 'VDart is among the top vendors we work with', q11: ['Quality of Candidates', 'Speed of Hiring'], q12: 'Yes', q13: 'I had some idea, but was not fully aware' }
    },
    {
        id: 17, bu: 'Rohit', name: 'Thomas Anderson', client: 'NeoTech Inc', function: 'Procurement', sent: true, received: true,
        responses: { q1: 4, q2: ['Innovation', 'Candidate Quality'], q3: 4, q4: 4, q5: 4, q6: 'No', q7: 4, q8: 'Bi-Weekly', q9: 8, q10: 'VDart is among the top vendors we work with', q11: ['Quality of Candidates', 'Innovation in Recruitment Processes'], q12: 'Yes', q13: 'Yes, I am fully aware of VDart\'s global presence' }
    },
    {
        id: 18, bu: 'Nambu', name: 'Rachel Green', client: 'GreenTech Solutions', function: 'HR', sent: true, received: true,
        responses: { q1: 5, q2: ['Industry-Specific Hiring Challenges', 'Innovation'], q3: 5, q4: 5, q5: 5, q6: 'No', q7: 5, q8: 'Weekly', q9: 9, q10: 'VDart is our number one preferred staffing partner', q11: ['Quality of Candidates', 'Innovation in Recruitment Processes'], q12: 'Yes', q13: 'Yes, I am fully aware of VDart\'s global presence' }
    },
    {
        id: 19, bu: 'Vinay', name: 'Steven Clark', client: 'BuildRight Corp', function: 'Procurement', sent: true, received: true,
        responses: { q1: 2, q2: ['Cost Control', 'Talent Availability'], q3: 2, q4: 2, q5: 2, q6: 'Yes', q7: 2, q8: 'Rarely', q9: 4, q10: 'Others', q11: ['Pricing and Value'], q12: 'No', q13: 'No, I thought VDart only operated in North America' }
    },
    {
        id: 20, bu: 'Sidd', name: 'Jessica Taylor', client: 'SmartSolutions Inc', function: 'HR', sent: true, received: true,
        responses: { q1: 4, q2: ['Hiring Speed', 'Quality'], q3: 4, q4: 4, q5: 4, q6: 'No', q7: 4, q8: 'Monthly', q9: 7, q10: 'VDart is among the top vendors we work with', q11: ['Quality of Candidates', 'Speed of Hiring'], q12: 'Yes', q13: 'Yes, I am fully aware of VDart\'s global presence' }
    }
];

const questions = {
    q1: { text: "How well does VDart understand your staffing requirements and expectations?", type: "rating", scale: 5 },
    q2: { text: "What are the top hiring challenges your organization is facing right now?", type: "multiple", options: ["Talent Availability", "Hiring Speed", "Cost Control", "Candidate Quality", "Industry-Specific Hiring Challenges", "Other"] },
    q3: { text: "How would you rate the overall quality of candidates VDart has provided?", type: "rating", scale: 5 },
    q4: { text: "How satisfied are you with VDart's speed in delivering candidates for your open roles?", type: "rating", scale: 5 },
    q5: { text: "How effectively does VDart act as a strategic hiring partner rather than just a service provider?", type: "rating", scale: 5 },
    q6: { text: "In the past quarter, have you faced any challenges or difficulties while working with VDart?", type: "yesno" },
    q7: { text: "How would you rate the responsiveness and communication of your VDart client partner?", type: "rating", scale: 5 },
    q8: { text: "In the past 3 months, how frequently has your VDart client partner proactively checked in with you?", type: "single", options: ["Weekly", "Bi-Weekly", "Monthly", "Occasionally", "Rarely"] },
    q9: { text: "On a scale from 0 to 10, how likely are you to recommend VDart to a colleague or business partner?", type: "rating", scale: 10 },
    q10: { text: "Among all the staffing vendors you work with, how does VDart rank in terms of service quality and effectiveness?", type: "single", options: ["VDart is our number one preferred staffing partner", "VDart is among the top vendors we work with", "VDart is similar to other vendors we use", "Others"] },
    q11: { text: "What key factor influences your willingness to continue working with VDart?", type: "multiple", options: ["Quality of Candidates", "Speed of Hiring", "Pricing and Value", "Innovation in Recruitment Processes", "Scope of Services Offered", "Transparency and Communication", "Others"] },
    q12: { text: "Would you be interested in exploring additional services offered by VDart beyond staffing solutions?", type: "yesno" },
    q13: { text: "Are you aware that VDart operates on a global scale, not just in North America?", type: "single", options: ["Yes, I am fully aware of VDart's global presence", "I had some idea, but was not fully aware", "No, I thought VDart only operated in North America", "I am not familiar with VDart's operations"] }
};
const questionOrder = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13'];
const BUs = ['All', ...new Set(surveyData.map(d => d.bu))];
const COLORS = { chart: ['#0078d4', '#107c10', '#ffb900', '#d13438', '#8b5cf6', '#ec4899'], nps: { promoter: '#10B981', passive: '#F59E0B', detractor: '#DC2626' } };

// **RESTORED** Modal Component
const DetailModal = ({ show, onClose, data }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">{data.title} ({data.respondents.length})</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>
                <div className="p-4 overflow-y-auto">
                    <ul className="divide-y divide-gray-200">
                        {data.respondents.map(respondent => (
                            <li key={respondent.id} className="py-2">
                                <p className="font-semibold text-gray-700">{respondent.name}</p>
                                <p className="text-sm text-gray-500">{respondent.client} ({respondent.bu})</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// --- Header Components ---
const GaugeChart = ({ score }) => {
    const scoreValue = isNaN(score) ? 0 : Math.max(-100, Math.min(100, score));
    const rotation = (scoreValue + 100) / 200 * 180;
    return (<div className="relative w-full flex justify-center items-center h-32"> <svg width="200" height="100" viewBox="0 0 200 100" className="w-full h-full"> <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e5e7eb" strokeWidth="20" /> <path d="M 20 100 A 80 80 0 0 1 80 27" fill="none" stroke={COLORS.nps.detractor} strokeWidth="20" /> <path d="M 80 27 A 80 80 0 0 1 120 27" fill="none" stroke={COLORS.nps.passive} strokeWidth="20" /> <path d="M 120 27 A 80 80 0 0 1 180 100" fill="none" stroke={COLORS.nps.promoter} strokeWidth="20" /> <g transform={`rotate(${rotation} 100 100)`}> <line x1="100" y1="100" x2="100" y2="20" stroke="#1f2937" strokeWidth="3" /> <circle cx="100" cy="100" r="5" fill="#1f2937" /> </g> </svg> <div className="absolute bottom-2 text-center"> <span className="text-4xl font-bold text-gray-800">{score.toFixed(1)}</span> <span className="text-sm text-gray-500">NPS</span> </div> </div>);
};
const OverallSatisfactionChart = ({ data }) => (
    <div> <h3 className="text-lg font-semibold text-gray-700 mb-2">Customer Satisfaction</h3> <div className="space-y-2"> {data.map((item) => (<div key={item.rating} className="flex items-center"> <div className="w-12 text-sm text-gray-600 flex items-center">{item.rating} <Star size={14} className="ml-1 text-yellow-400" /></div> <div className="flex-1 bg-gray-200 rounded-full h-4"> <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${item.percentage}%` }}></div> </div> <div className="w-12 text-right text-sm font-medium text-gray-700">{item.percentage.toFixed(1)}%</div> </div>))} </div> </div>
);

// --- Charting Components ---
const BuPerformanceChart = ({ data }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-full">
        <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">Business Unit Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 5]} />
                <YAxis type="category" dataKey="bu" width={60} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px' }} />
                <Bar dataKey="avgRating" fill="#0078d4" barSize={30}>
                    {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} />))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
);
const NPSDisplay = ({ questionId, data, onCategoryClick }) => {
    const { npsScore, counts } = data.stats;
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-full">
            <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
                <span className="font-extrabold text-blue-600">Q{questionId.slice(1)}:</span> {questions[questionId].text}
            </h3>
            <div className="text-center mb-4">
                <div className="text-5xl font-bold text-blue-600">{npsScore.toFixed(1)}</div>
                <div className="text-md font-semibold text-gray-600">Net Promoter Score</div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-red-50 rounded-lg border border-red-200 cursor-pointer hover:bg-red-100" onClick={() => onCategoryClick(`Detractors for Q${questionId.slice(1)}`, data.respondents.detractors)}>
                    <div className="text-2xl font-bold text-red-600">{counts.detractors}</div>
                    <div className="text-sm font-medium text-red-700">Detractors ({counts.detractorPercent.toFixed(0)}%)</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 cursor-pointer hover:bg-yellow-100" onClick={() => onCategoryClick(`Passives for Q${questionId.slice(1)}`, data.respondents.passives)}>
                    <div className="text-2xl font-bold text-yellow-600">{counts.passives}</div>
                    <div className="text-sm font-medium text-yellow-700">Passive ({counts.passivePercent.toFixed(0)}%)</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100" onClick={() => onCategoryClick(`Promoters for Q${questionId.slice(1)}`, data.respondents.promoters)}>
                    <div className="text-2xl font-bold text-green-600">{counts.promoters}</div>
                    <div className="text-sm font-medium text-green-700">Promoters ({counts.promoterPercent.toFixed(0)}%)</div>
                </div>
            </div>
        </div>
    );
};
const RatingDisplay = ({ questionId, data, onRatingClick }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
                <span className="font-extrabold text-blue-600">Q{questionId.slice(1)}:</span> {questions[questionId].text}
            </h3>
            <div className="text-center mb-6">
                <div className="text-gray-600 mb-2">Average Rating</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                    {Array.from({ length: 5 }, (_, i) => (<Star key={i} size={28} className={i < Math.round(data.stats.average) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"} />))}
                </div>
                <div className="text-3xl font-bold text-gray-800">{data.stats.average?.toFixed(2)} / 5.00</div>
            </div>
            <div className="w-full mt-auto">
                <div className="grid grid-cols-6 text-center font-semibold text-sm text-gray-600 bg-gray-50 rounded-t-lg border-x border-t border-gray-200">
                    {Array.from({ length: 5 }, (_, i) => (<div key={i} className="p-2 border-r border-gray-200 flex justify-center items-center"> {i + 1} <Star size={16} className="ml-1 text-yellow-400" /> </div>))}
                    <div className="p-2">Total</div>
                </div>
                <div className="grid grid-cols-6 text-center text-lg font-bold text-blue-600 border border-gray-200 rounded-b-lg">
                    {data.points.map(p => (
                        <div key={p.rating} className="p-3 border-r border-gray-200 cursor-pointer hover:bg-blue-50" onClick={() => onRatingClick(`${p.rating}-Star Reviews for Q${questionId.slice(1)}`, p.respondents)}>
                            {p.count}
                        </div>
                    ))}
                    <div className="p-3 bg-gray-100 text-gray-800">{data.stats.totalResponses}</div>
                </div>
            </div>
        </div>
    );
};
const PieChartDisplay = ({ questionId, data, onSliceClick }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-full">
            <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
                <span className="font-extrabold text-blue-600">Q{questionId.slice(1)}:</span> {questions[questionId].text}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={data.points} dataKey="count" nameKey="option" cx="50%" cy="50%" outerRadius={100} style={{ cursor: 'pointer' }} onClick={(d) => onSliceClick(`Responded "${d.option}" for Q${questionId.slice(1)}`, d.payload.respondents)}>
                        {data.points.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} className="hover:opacity-80" />))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px' }} />
                    <Legend iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

// --- Main Dashboard Component ---
const Dashboard = () => {
    const [selectedBU, setSelectedBU] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);

    const filteredData = useMemo(() => {
        return selectedBU === 'All' ? surveyData : surveyData.filter(item => item.bu === selectedBU);
    }, [selectedBU]);

    const { headerStats, analysisData, buPerformance } = useMemo(() => {
        const receivedData = filteredData.filter(d => d.received && d.responses);

        // --- Header Stats ---
        const npsResponses = receivedData.map(d => d.responses.q9).filter(r => typeof r === 'number');
        const npsScore = npsResponses.length > 0 ? ((npsResponses.filter(r => r >= 9).length / npsResponses.length) * 100 - (npsResponses.filter(r => r <= 6).length / npsResponses.length) * 100) : 0;
        const fiveStarRatings = questionOrder.filter(q => questions[q].type === 'rating' && questions[q].scale === 5).flatMap(qId => receivedData.map(d => d.responses[qId]).filter(r => typeof r === 'number'));
        const overallAvgRating = fiveStarRatings.length > 0 ? fiveStarRatings.reduce((a, b) => a + b, 0) / fiveStarRatings.length : 0;
        const satisfactionCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        fiveStarRatings.forEach(r => { satisfactionCounts[r]++; });

        // --- Per-Question Analysis with Respondent Tracking ---
        const analysis = {};
        questionOrder.forEach(qId => {
            const question = questions[qId];
            const validRespondents = receivedData.filter(d => d.responses && d.responses[qId] != null);

            if (question.type === 'rating') {
                if (question.scale === 10) { // NPS
                    const promoters = validRespondents.filter(d => d.responses.q9 >= 9);
                    const passives = validRespondents.filter(d => d.responses.q9 >= 7 && d.responses.q9 <= 8);
                    const detractors = validRespondents.filter(d => d.responses.q9 <= 6);
                    const total = validRespondents.length;
                    analysis[qId] = { respondents: { promoters, passives, detractors }, stats: { npsScore: total > 0 ? (promoters.length / total * 100 - detractors.length / total * 100) : 0, counts: { promoters: promoters.length, passives: passives.length, detractors: detractors.length, promoterPercent: total > 0 ? promoters.length / total * 100 : 0, passivePercent: total > 0 ? passives.length / total * 100 : 0, detractorPercent: total > 0 ? detractors.length / total * 100 : 0 } } };
                } else { // 5-star
                    const ratings = validRespondents.map(d => d.responses[qId]);
                    analysis[qId] = {
                        points: Array.from({ length: 5 }, (_, i) => i + 1).map(r => ({ rating: r, count: ratings.filter(v => v === r).length, respondents: validRespondents.filter(d => d.responses[qId] === r) })),
                        stats: { totalResponses: ratings.length, average: ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0 }
                    };
                }
            } else { // Choice
                const options = [...new Set(validRespondents.flatMap(d => d.responses[qId]))];
                analysis[qId] = { points: options.map(opt => { const respondents = validRespondents.filter(d => Array.isArray(d.responses[qId]) ? d.responses[qId].includes(opt) : d.responses[qId] === opt); return { option: opt, count: respondents.length, respondents }; }).sort((a, b) => b.count - a.count) };
            }
        });

        // --- BU Performance ---
        const buPerf = BUs.slice(1).map(bu => {
            const buData = surveyData.filter(d => d.bu === bu && d.received && d.responses);
            const buRatings = questionOrder.filter(q => questions[q].type === 'rating' && questions[q].scale === 5).flatMap(qId => buData.map(d => d.responses[qId]).filter(r => typeof r === 'number'));
            return { bu, avgRating: buRatings.length > 0 ? buRatings.reduce((a, b) => a + b, 0) / buRatings.length : 0 };
        });

        return {
            headerStats: { nps: npsScore, overallAvgRating: overallAvgRating.toFixed(2), respondents: receivedData.length, responseRate: (filteredData.length > 0 ? receivedData.length / filteredData.length * 100 : 0).toFixed(1), totalClients: new Set(receivedData.map(i => i.client)).size, overallSatisfactionData: Object.keys(satisfactionCounts).reverse().map(key => ({ rating: parseInt(key), percentage: fiveStarRatings.length > 0 ? (satisfactionCounts[key] / fiveStarRatings.length) * 100 : 0 })) },
            analysisData: analysis,
            buPerformance: buPerf
        };
    }, [filteredData]);

    const handleViewDetails = (title, respondents) => {
        setModalData({ title, respondents });
        setShowModal(true);
    };

    const getQuestionComponent = (qId) => {
        const question = questions[qId];
        switch (question.type) {
            case 'rating': return question.scale === 10 ? <NPSDisplay key={qId} questionId={qId} data={analysisData[qId]} onCategoryClick={handleViewDetails} /> : <RatingDisplay key={qId} questionId={qId} data={analysisData[qId]} onRatingClick={handleViewDetails} />;
            case 'multiple': case 'single': case 'yesno': return <PieChartDisplay key={qId} questionId={qId} data={analysisData[qId]} onSliceClick={handleViewDetails} />;
            default: return null;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
            <DetailModal show={showModal} onClose={() => setShowModal(false)} data={modalData} />
            <div className="max-w-screen-2xl mx-auto">
                <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div> <h1 className="text-3xl font-bold text-gray-800">Customer Satisfaction Report</h1> <p className="text-gray-600 mt-1">Interactive analysis of Survey, NPS, and CSAT Insights</p> </div>
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                        <select value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)} className="bg-white font-semibold text-gray-700 focus:outline-none p-2 rounded-lg shadow-sm border">
                            {BUs.map(bu => <option key={bu} value={bu}>{bu === 'All' ? 'All BUs' : `${bu} BU`}</option>)}
                        </select>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-all flex items-center"> <Download size={18} className="mr-2" /> Export </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="lg:col-span-1 flex flex-col justify-center items-center text-center"><GaugeChart score={headerStats.nps} /></div>
                    <div className="lg:col-span-1 flex flex-col justify-center items-center text-center border-y md:border-y-0 md:border-x border-gray-200 py-4 md:py-0 md:px-4">
                        <div className="text-5xl font-bold text-gray-800">{headerStats.overallAvgRating}</div>
                        <div className="flex items-center justify-center gap-1 my-2"> {Array.from({ length: 5 }, (_, i) => (<Star key={i} size={24} className={i < Math.round(headerStats.overallAvgRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"} />))} </div>
                        <p className="font-semibold text-gray-600">Overall Rating</p>
                    </div>
                    <div className="lg:col-span-2 xl:col-span-1 flex flex-col justify-center"><OverallSatisfactionChart data={headerStats.overallSatisfactionData} /></div>
                    <div className="lg:col-span-2 xl:col-span-2 grid grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-4">
                        <div className="flex items-center"> <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-3"><Users size={24} /></div> <div> <p className="text-2xl font-bold text-gray-800">{headerStats.respondents}</p> <p className="text-sm text-gray-500 font-medium">Respondents</p> </div> </div>
                        <div className="flex items-center"> <div className="p-3 rounded-full bg-green-100 text-green-600 mr-3"><CheckCircle size={24} /></div> <div> <p className="text-2xl font-bold text-gray-800">{headerStats.responseRate}%</p> <p className="text-sm text-gray-500 font-medium">Response Rate</p> </div> </div>
                        <div className="flex items-center"> <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-3"><Send size={24} /></div> <div> <p className="text-2xl font-bold text-gray-800">{surveyData.length}</p> <p className="text-sm text-gray-500 font-medium">Surveys Sent</p> </div> </div>
                        <div className="flex items-center"> <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-3"><Briefcase size={24} /></div> <div> <p className="text-2xl font-bold text-gray-800">{headerStats.totalClients}</p> <p className="text-sm text-gray-500 font-medium">Total Clients</p> </div> </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-2"><BuPerformanceChart data={buPerformance} /></div>
                    {questionOrder.map(qId => (<div key={qId} className="lg:col-span-2">{getQuestionComponent(qId)}</div>))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;