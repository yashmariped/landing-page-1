const output=document.querySelector('#output'),form=document.querySelector('#shell'),input=document.querySelector('#cmd');
const data={
help:`Available commands:\n  whoami       about me\n  experience   work history\n  skills       security focus\n  certs        certifications\n  education    academic background\n  contact      email + LinkedIn\n  linkedin     open LinkedIn\n  email        compose email\n  clear        clear terminal`,
whoami:`Yashwanth Reddy\nSecurity Engineer @ Amazon\n\nApplication Security · Threat Modeling · Cloud Security\nVulnerability Management · Python Automation · Web Security\nCurrently expanding into penetration testing, exploit research and offensive security.`,
experience:`Amazon — Security Engineer, Devices & Services Security (Apr 2026 — Present)\nIntuit — Information Security Engineer (Mar 2025 — Mar 2026)\nAssurant — Cyber Security Engineer (Aug 2023 — Feb 2025)\nMovate — Security Operations Engineer (Jan 2022 — Nov 2022)`,
skills:`Application Security\nThreat Modeling\nCloud Security\nVulnerability Management\nPython Automation\nWeb Application Security\nSecurity Reviews`,
certs:`CTMP — Practical DevSecOps — Jul 2026 — CTMP7SDID2ML\nGoogle Cybersecurity — Sep 2024 — G3AJ4IT7FAVW\nCompTIA Security+ ce — Sep 2024 — Sep 2027`,
education:`University of Alabama at Birmingham — Master's, Computer & Information Systems Security / Information Assurance\nJNTUH College of Engineering Hyderabad — BTech, ECE`,
contact:`Email: yashwanthreddyeh@gmail.com\nLinkedIn: linkedin.com/in/yashmaripeddi`
};
function print(text,cls=''){const p=document.createElement('p');p.className=cls;p.textContent=text;output.appendChild(p);output.scrollTop=output.scrollHeight}
form.addEventListener('submit',e=>{e.preventDefault();const raw=input.value.trim(),cmd=raw.toLowerCase();print(`yash@yashhacks:~$ ${raw}`,'prompt');input.value='';if(!cmd)return;if(cmd==='clear'){output.innerHTML='';return}if(cmd==='linkedin'){window.open('https://www.linkedin.com/in/yashmaripeddi/','_blank');print('Opening LinkedIn…');return}if(cmd==='email'){location.href='mailto:yashwanthreddyeh@gmail.com';return}if(data[cmd])print(data[cmd]);else print(`command not found: ${cmd}. Type 'help'.`,'muted')});
document.querySelector('#terminal').addEventListener('click',()=>input.focus());