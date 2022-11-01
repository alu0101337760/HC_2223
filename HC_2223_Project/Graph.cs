using System.Collections.Generic;

namespace HC_2223_Project
{
    public class Graph
    {
        int numberOfVertex;
        HashSet<(int, int)> arcs;

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

        }

        public override string ToString()
        {
            return "Not implemented yet";
        }

    }
}
