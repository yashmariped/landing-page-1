'use strict';

(() => {
  const output = document.getElementById('output');
  const form = document.getElementById('shell');
  const input = document.getElementById('cmd');
  const promptEl = document.getElementById('shellPrompt');
  if (!output || !form || !input || !promptEl) return;

  const MAX_HISTORY = 30;
  const MAX_COMMAND_LENGTH = 96;
  let cwd = '~';
  let history = [];
  let historyIndex = 0;

  const files = Object.freeze({
    'about.txt': 'Yashwanth Reddy — Security Engineer @ Amazon\n\nApplication security · Threat modeling · Cloud security · Vulnerability management · Python automation · Web security\n\nCurrently going deeper into penetration testing, exploit research and offensive security.',
    'experience.txt': 'Amazon — Security Engineer, Devices & Services Security — Apr 2026 → Present\nIntuit — Information Security Engineer — Mar 2025 → Mar 2026\nAssurant — Cyber Security Engineer — Aug 2023 → Feb 2025\nMovate — Security Operations Engineer — Jan 2022 → Nov 2022',
    'skills.txt': 'Application Security\nThreat Modeling\nCloud Security\nVulnerability Management\nPython Automation\nWeb Application Security\nSecurity Reviews',
    'projects.txt': 'landing-page-1/\nsimple-siem-tool/\nbasic-firewall-configuration/',
    'education.txt': 'University of Alabama at Birmingham — Master’s, Computer & Information Systems Security / Information Assurance\nJNTUH College of Engineering Hyderabad — BTech, ECE',
    'contact.txt': 'Email: yashwanthreddyeh@gmail.com\nLinkedIn: linkedin.com/in/yashmaripeddi\nGitHub: github.com/yashmariped',
    'recommendations.txt': 'Prasanna Shrestha — “Strong ownership and impact to security and automation initiatives.”\nSean Nikbosh — “A standout security professional… able to take complex security challenges and build practical, automated solutions.”',
    'learning.txt': 'Penetration testing\nExploit research\nOffensive security\nWeb & API security\nCloud security architecture'
  });

  const certFiles = Object.freeze({
    'ctmp.cred': 'Certified Threat Modeling Professional\nPractical DevSecOps · Jul 2026\nCredential ID: CTMP7SDID2ML\nVerify: credly.com/badges/964cb68d-0b83-4221-ad1e-8e65909c66f4/public_url',
    'google.cred': 'Google Cybersecurity\nGoogle / Coursera · Sep 2024\nCredential ID: G3AJ4IT7FAVW',
    'security-plus.cred': 'CompTIA Security+ ce\nIssued Sep 2024 · Expires Sep 2027'
  });

  const commands = Object.freeze(['help','ls','pwd','whoami','experience','skills','projects','certs','education','recommendations','learning','contact','cat','cd','clear','linkedin','github','email']);
  const allowedExternal = Object.freeze({
    linkedin: 'https://www.linkedin.com/in/yashmaripeddi/',
    github: 'https://github.com/yashmariped'
  });

  function print(text, className = '') {
    const p = document.createElement('p');
    if (className) p.className = className;
    p.textContent = String(text);
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
  }

  function setPrompt() {
    promptEl.textContent = `yash@yashhacks:${cwd}$`;
  }

  function openTrusted(url) {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return;
    window.open(parsed.href, '_blank', 'noopener,noreferrer');
  }

  function run(rawInput) {
    const normalized = rawInput.slice(0, MAX_COMMAND_LENGTH).trim();
    const parts = normalized.split(/\s+/u);
    const cmd = (parts.shift() || '').toLowerCase();
    const arg = parts[0] || '';
    if (!cmd) return;

    if (cmd === 'clear') { output.replaceChildren(); return; }
    if (cmd === 'help') { print('COMMANDS\n  ls                    list files\n  cat <file>            read a local portfolio file\n  cd certs | cd ~       change virtual directory\n  pwd                   show virtual path\n  whoami                about me\n  experience            work history\n  skills                security focus\n  projects              public projects\n  certs                 certifications\n  education             academic background\n  recommendations       colleague recommendations\n  learning              current learning\n  contact               contact details\n  linkedin | github     open trusted profile\n  email                 compose email\n  clear                 clear terminal\n\nTip: ↑/↓ for history, Tab for completion. This is a local portfolio shell—not a system shell.'); return; }
    if (cmd === 'pwd') { print(cwd === '~' ? '/home/yash' : `/home/yash/${cwd}`); return; }
    if (cmd === 'ls') { print(cwd === 'certs' ? Object.keys(certFiles).join('  ') : `${Object.keys(files).join('  ')}  certs/`); return; }
    if (cmd === 'cd') {
      const dest = arg.replace(/\/+$/u, '');
      if (!dest || dest === '~' || dest === '..') cwd = '~';
      else if (dest === 'certs') cwd = 'certs';
      else { print(`cd: no such directory: ${dest}`, 'muted'); return; }
      setPrompt(); return;
    }
    if (cmd === 'cat') {
      const source = cwd === 'certs' ? certFiles : files;
      if (Object.prototype.hasOwnProperty.call(source, arg)) print(source[arg]);
      else print(`cat: ${arg || '(missing file)'}: No such file`, 'muted');
      return;
    }

    const aliases = Object.freeze({
      whoami: 'about.txt', experience: 'experience.txt', skills: 'skills.txt', projects: 'projects.txt', education: 'education.txt', recommendations: 'recommendations.txt', learning: 'learning.txt', contact: 'contact.txt'
    });
    if (Object.prototype.hasOwnProperty.call(aliases, cmd)) { print(files[aliases[cmd]]); return; }
    if (cmd === 'certs') { print(Object.values(certFiles).join('\n\n')); return; }
    if (Object.prototype.hasOwnProperty.call(allowedExternal, cmd)) { openTrusted(allowedExternal[cmd]); print(`Opening ${cmd}…`); return; }
    if (cmd === 'email') { window.location.assign('mailto:yashwanthreddyeh@gmail.com'); return; }
    print(`command not found: ${cmd}. Type 'help'.`, 'muted');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const raw = input.value.slice(0, MAX_COMMAND_LENGTH).trim();
    if (!raw) return;
    print(`${promptEl.textContent} ${raw}`, 'prompt');
    history.push(raw);
    if (history.length > MAX_HISTORY) history.shift();
    historyIndex = history.length;
    input.value = '';
    run(raw);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (historyIndex > 0) input.value = history[--historyIndex] || '';
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex < history.length) historyIndex += 1;
      input.value = history[historyIndex] || '';
    } else if (event.key === 'Tab') {
      event.preventDefault();
      const value = input.value.trim();
      if (value.startsWith('cat ')) {
        const query = value.slice(4);
        const names = cwd === 'certs' ? Object.keys(certFiles) : Object.keys(files);
        const match = names.find((name) => name.startsWith(query));
        if (match) input.value = `cat ${match}`;
      } else {
        const match = commands.find((command) => command.startsWith(value));
        if (match) input.value = match;
      }
    }
  });

  document.getElementById('terminal')?.addEventListener('click', () => input.focus());
  setPrompt();
})();
