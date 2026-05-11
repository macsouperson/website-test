const data = {
  persons: [
    { id: "p1", name: "John" },
    { id: "p2", name: "Wife A" },
    { id: "p3", name: "Wife B" },
    { id: "c1", name: "Child 1" },
    { id: "c2", name: "Child 2" },
    { id: "c3", name: "Child 3" }
  ],
  unions: [
    {
      id: "u1",
      partners: ["p1", "p2"],
      children: ["c1", "c2"]
    },
    {
      id: "u2",
      partners: ["p1", "p3"],
      children: ["c3"]
    }
  ]
};