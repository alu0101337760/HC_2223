using System.Collections.Generic;

namespace HC_2223_Project
{
    public class VCToHCConverter
    {

        static private void AddVertexCoverArcs(int i, ref HashSet<(int, int)> newArcs)
        {
            newArcs.Add((i * 12 + 1, i * 12 + 2));
            newArcs.Add((i * 12 + 2, i * 12 + 3));
            newArcs.Add((i * 12 + 3, i * 12 + 4));
            newArcs.Add((i * 12 + 4, i * 12 + 5));
            newArcs.Add((i * 12 + 5, i * 12 + 6));
            newArcs.Add((i * 12 + 7, i * 12 + 8));
            newArcs.Add((i * 12 + 8, i * 12 + 9));
            newArcs.Add((i * 12 + 9, i * 12 + 10));
            newArcs.Add((i * 12 + 10, i * 12 + 11));
            newArcs.Add((i * 12 + 11, i * 12 + 12));
            newArcs.Add((i * 12 + 1, i * 12 + 9));
            newArcs.Add((i * 12 + 3, i * 12 + 7));
            newArcs.Add((i * 12 + 4, i * 12 + 12));
            newArcs.Add((i * 12 + 6, i * 12 + 10));
        }

        static private void AddEndpointsAndStartedPaths(int i, ref List<(int, int)> arcsList, ref List<int> endpoints, ref HashSet<int> startedPaths)
        {
            if (!startedPaths.Contains(arcsList[i].Item1))
            {
                endpoints.Add(i * 12 + 1);
                startedPaths.Add(arcsList[i].Item1);
            }
            if (!startedPaths.Contains(arcsList[i].Item2))
            {
                endpoints.Add(i * 12 + 7);
                startedPaths.Add(arcsList[i].Item2);
            }
          
        }

        static private void ConnectSelectors(int vertexCoverSize, int newVertexNumber, List<int> endpoints, ref HashSet<(int, int)> newArcs)
        {
            for (int i = 0; i < endpoints.Count; i++)
            {
                for (int j = 0; j < vertexCoverSize; j++)
                {
                    newArcs.Add((endpoints[i], newVertexNumber - j));
                }
            }

        }

        static public Graph VC2HC(Graph inputGraph, int vertexCoverSize)
        {
            List<(int, int)> arcsList = new List<(int, int)>(inputGraph.arcs);
            HashSet<(int, int)> newArcs = new HashSet<(int, int)>();

            // Crear CoverTesting Vertex y Selectors
            int newVertexNumber = arcsList.Count * 12 + vertexCoverSize;
            List<int> endpoints = new List<int>();
            HashSet<int> startedPaths = new HashSet<int>();

            // Conectar CoverTesting
            for (int i = 0; i < arcsList.Count; ++i)
            {

                bool item1IsConnected = true;
                bool item2IsConnected = true;

                AddEndpointsAndStartedPaths(i, ref arcsList, ref endpoints, ref startedPaths);

                if (arcsList[i].Item1 == arcsList[i].Item2)
                {
                    newArcs.Add((i * 12 + 6, i * 12 + 7));
                    item1IsConnected = false;
                }


                for (int j = i + 1; j < arcsList.Count && (item1IsConnected || item2IsConnected); ++j)
                {
                    if (item1IsConnected)
                    {
                        if (arcsList[i].Item1 == arcsList[j].Item1)
                        {
                            newArcs.Add((i * 12 + 6, j * 12 + 1));
                            item1IsConnected = false;
                        }
                        else if (arcsList[i].Item1 == arcsList[j].Item2)
                        {
                            newArcs.Add((i * 12 + 6, j * 12 + 7));
                            item1IsConnected = false;
                        }
                    }
                    if (item2IsConnected)
                    {
                        if (arcsList[i].Item2 == arcsList[j].Item1)
                        {
                            newArcs.Add((i * 12 + 12, j * 12 + 1));
                            item2IsConnected = false;
                        }
                        else if (arcsList[i].Item2 == arcsList[j].Item2)
                        {
                            newArcs.Add((i * 12 + 12, j * 12 + 7));
                            item2IsConnected = false;
                        }
                    }
                }
                AddVertexCoverArcs(i, ref newArcs);
                if (item1IsConnected)
                {
                    endpoints.Add(i * 12 + 6);
                }
                if (item2IsConnected)
                {
                    endpoints.Add(i * 12 + 12);
                }
            }

            ConnectSelectors(vertexCoverSize, newVertexNumber, endpoints,ref newArcs);

            return new Graph(newVertexNumber, newArcs);
        }
    }
}
