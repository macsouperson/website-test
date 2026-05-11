const tree = document.getElementById("tree");

function createNode(id, label, type) {
  const el = document.createElement("div");
  el.className = `node ${type}`;
  el.id = id;
  el.innerText = label;
  tree.appendChild(el);
  return el;
}

// Create person nodes
data.persons.forEach(p => {
  createNode(p.id, p.name, "person");
});

// Create union nodes (invisible connectors)
data.unions.forEach(u => {
  createNode(u.id, "", "union");
});

function layout() {
  const levelGap = 120;
  const nodeGap = 120;

  let y = 50;

  // naive layout: persons on top
  data.persons.forEach((p, i) => {
    const el = document.getElementById(p.id);
    el.style.left = `${i * nodeGap + 50}px`;
    el.style.top = `${y}px`;
  });

  // unions below
  y += levelGap;
  data.unions.forEach((u, i) => {
    const el = document.getElementById(u.id);
    el.style.left = `${i * nodeGap + 100}px`;
    el.style.top = `${y}px`;
  });

  // children below unions
  y += levelGap;
  data.unions.forEach((u, i) => {
    u.children.forEach((cid, j) => {
      const el = document.getElementById(cid);
      el.style.left = `${(i * nodeGap) + j * 80 + 80}px`;
      el.style.top = `${y}px`;
    });
  });
}

layout();

const svg = document.getElementById("lines");

function connect(a, b) {
  const rect1 = a.getBoundingClientRect();
  const rect2 = b.getBoundingClientRect();

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  line.setAttribute("x1", rect1.left + rect1.width / 2);
  line.setAttribute("y1", rect1.top + rect1.height);

  line.setAttribute("x2", rect2.left + rect2.width / 2);
  line.setAttribute("y2", rect2.top);

  line.setAttribute("stroke", "black");

  svg.appendChild(line);
}

function drawConnections() {
  svg.innerHTML = "";

  data.unions.forEach(u => {
    const unionEl = document.getElementById(u.id);

    // connect partners → union
    u.partners.forEach(pid => {
      connect(document.getElementById(pid), unionEl);
    });

    // connect union → children
    u.children.forEach(cid => {
      connect(unionEl, document.getElementById(cid));
    });
  });
}

drawConnections();