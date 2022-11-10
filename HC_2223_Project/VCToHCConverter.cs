using System.Collections.Generic;
using System.Globalization;

namespace HC_2223_Project
{
    public class VCToHCConverter
    {
        
        static public Graph VC2HC(Graph inputGraph, int VertexCoverSize)
        {
            List<(int, int)> arcsList = new List<(int, int)>(inputGraph.arcs);
            HashSet<(int, int)> newArcs = new HashSet<(int, int)>();
            // Crear CoverTesting Vertex y Selectors
            int newVertexNumber = arcsList.Count * 12 + VertexCoverSize;
            List<int> endpoints = new List<int>();
            HashSet<int> startedPaths = new HashSet<int>();
            // Conectar CoverTesting
            for (int i = 0; i < arcsList.Count; ++i)
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
                bool item1Connection = true;
                bool item2Connection = true;
                if (arcsList[i].Item1 == arcsList[i].Item2)
                {
                    newArcs.Add((i * 12 + 6, i * 12 + 7));
                    item1Connection = false;
                }
                for (int j = i + 1; j < arcsList.Count && (item1Connection || item2Connection); ++j)
                {
                    if (item1Connection)
                    {
                        if (arcsList[i].Item1 == arcsList[j].Item1)
                        {
                            newArcs.Add((i * 12 + 6, j * 12 + 1));
                            item1Connection = false;
                        }
                        else if (arcsList[i].Item1 == arcsList[j].Item2)
                        {
                            newArcs.Add((i * 12 + 6, j * 12 + 7));
                            item1Connection = false;
                        }
                    }
                    if (item2Connection)
                    {
                        if (arcsList[i].Item2 == arcsList[j].Item1)
                        {
                            newArcs.Add((i * 12 + 12, j * 12 + 1));
                            item2Connection = false;
                        }
                        else if (arcsList[i].Item2 == arcsList[j].Item2)
                        {
                            newArcs.Add((i * 12 + 12, j * 12 + 7));
                            item2Connection = false;
                        }
                    }
                }
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
                if (item1Connection)
                {
                    endpoints.Add(i * 12 + 6);
                }
                if (item2Connection)
                {
                    endpoints.Add(i * 12 + 12);
                }
            }
            // Conectar selectores (quizá se haga en parte en el bucle anterior)
            for (int i = 0; i < endpoints.Count; i++)
            {                
                for (int j = 0; j < VertexCoverSize; j++)
                {
                    newArcs.Add((endpoints[i], newVertexNumber - VertexCoverSize));
                }
            }
            return new Graph(newVertexNumber, newArcs);
        }       
    }
}
