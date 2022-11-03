using System.Collections.Generic;

namespace HC_2223_Project
{
    public class Graph
    {
        public int numberOfVertex { get; private set; }
        public HashSet<(int, int)> arcs { get; private set; }

        public Graph(int numberOfVertex, HashSet<(int, int)> arcs)
        {
            this.numberOfVertex = numberOfVertex;
            this.arcs = arcs;
        }

        public Graph(string filename)
        {
            InitializeFromFile(filename);
        }

        private void InitializeFromFile(string filename)
        {
            string[] lines = System.IO.File.ReadAllLines(filename);
            numberOfVertex = int.Parse(lines[0]);
            arcs = new HashSet<(int, int)>();
            for (int i = 0; i < lines.Length; ++i)
            {
                string[] line = lines[i].Split(' ');
                arcs.Add((int.Parse(line[0]), int.Parse(line[1])));
            }
        }

        public override string ToString()
        {
            string result = numberOfVertex.ToString() + System.Environment.NewLine;
            foreach ((int, int) arc in arcs)
            {
                result += arc.Item1.ToString() + " " + arc.Item2.ToString() + System.Environment.NewLine;
            }
            return result;
        }
    }
}
