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
            // Conectar CoverTesting
            for (int i = 0; i < arcsList.Count; ++i)
            {
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
                        } else if (arcsList[i].Item1 == arcsList[j].Item2)
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
            }
            // Conectar selectores (quizá se haga en parte en el bucle anterior)
            return null;
        }       
    }
}
