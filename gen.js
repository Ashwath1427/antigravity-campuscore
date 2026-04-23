const fs = require('fs');

const raw = `
1	9C	3160136	PRANEETH BHUKYA
2	9C	3160417	SATHWIK REDDY GANTA
3	9C	3160662	KOTHA ASHVIK
4	9C	3170292	BOPPARAJU ABHIRAM
5	9C	3170355	BOYINI VIVEKANANDA MUDIRAJ
6	9C	3170390	LOLLA ABHIRAM
7	9C	3180076	KASULA ASHWATH
8	9C	3180133	SNITHIK VENGALA
9	9C	3180183	NIDHISH DUMALA
10	9C	3180184	YAMMANURU HARITEJA
11	9C	3180286	CHARAN BATTU
12	9C	3190472	ATHUL M
13	9C	3200320	SIDDHARTH REDDY SADIVILLA
14	9C	3200437	SIDDALA RAMCHARAN
15	9C	3210447	SAPAVATH JAHNAVI
16	9C	3210590	K MOKSHA
17	9C	3230302	BOJJA HARIKESH REDDY
18	9C	3230706	EKADANTHA YADAV
19	9C	3240214	NIMMAKAYALA PRATEEK REDDY
20	9C	3240504	CHEEKOORI SAI CHARAN
21	9C	3240693	VALLETI SAI HARSHITH
22	9C	3250112	P SATHWIK REDDY
23	9C	3260066	DEPA AARYAN REDDY (NA)
24	9C	3230719	G MANASWINI
25	9C	3170068	SHERI RITHIK REDDY
26	9C	3220915	BHUKYA PRANAVI
27	9C	3190133	TANABUDDI SRI BHAVESH REDDY`;

let users = `// Generated Parent Users\n`;
let students = `// Generated Students\n`;

raw.trim().split('\n').forEach((line, i) => {
  const [sno, ssec, adm, name] = line.split('\t');
  let cleanName = name.replace(' (NA)', '');
  let id = 100 + parseInt(sno);
  users += `  {
    id: ${id},
    username: "P${adm}A",
    password: "parent123",
    name: "Parent of ${cleanName}",
    role: "parent",
    roleLabel: "Parent",
    department: "Parent of ${cleanName} (Class 9-C)",
    phone: "+91 99999 000${sno.padStart(2, '0')}",
    email: "parent${adm}@example.com",
    joined: "Apr 2024",
    avatar_color: "#f57c00",
    icon: "fa-user-friends",
    childName: "${cleanName}",
    childId: "${adm}",
    childClass: "9-C",
    childRoll: "${sno.padStart(2, '0')}",
    notifications: []
  },
`;
  students += `  { id: "S${100+parseInt(sno)}", admNo: "${adm}", name: "${cleanName}", class: "9-C", roll: "${sno.padStart(2, '0')}", gender: "Unknown", dob: "15 Jan 2011", attendance: ${85 + (i%15)}, behavior: "Good", fee_status: "Paid", gpa: ${(7.5 + (i%20)*0.1).toFixed(1)}, parent: "Parent of ${cleanName}" },\n`;
});

fs.writeFileSync('C:\\Users\\Kasula Santhosh\\OneDrive\\Desktop\\ANTIGRAVATI CAMPUSCORE\\gen_output.txt', users + '\n\n' + students);
