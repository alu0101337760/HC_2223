using System.Collections.Generic;

namespace HC_2223_Project
{
    /// <summary>
    /// Class that implements a conversion from a Vertex Vover problem input 
    /// to a Hamiltonian Circuit problem input.
    /// </summary>
    public class VCToHCConverter
    {
        /// <summary>
        /// Populates endpoints and startedPaths with the current arc's cover testing start or endpoints.
        /// </summary>
        /// <param name="arcIndex"> The index of the current arc. </param>
        /// <param name="currentArc"> The current arc. </param>
        /// <param name="outerPoints"> The list with all of the cover testing endpoints free to bond with the selectors. </param>
        /// <param name="startedPahts"> The set of original vertex that have already appear in the arcList </param>
        static private void AddInitialOuterPoints(int arcIndex, (int, int) currentArc, ref List<int> outerPoints, ref HashSet<int> startedPahts)
        {
            if (!startedPahts.Contains(currentArc.Item1))
            {
                outerPoints.Add(arcIndex * 12 + 1);
                startedPahts.Add(currentArc.Item1);
            }
            if (!startedPahts.Contains(currentArc.Item2))
            {
                outerPoints.Add(arcIndex * 12 + 7);
                startedPahts.Add(currentArc.Item2);
            }
        }

        /// <summary>
        /// Adds all of the internal arcs of the current cover testing to newArcs
        /// </summary>
        /// <param name="i"> The index of the current arc being examined. </param>
        /// <param name="newArcs"> The HashSet containing all of the arcs of the output graph. </param>
        static private void AddCoverTestingArcs(int i, ref HashSet<(int, int)> newArcs)
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

        /// <summary>
        /// Checks if the vertex of the current arc remain unconnected and adds them to outer points if so.
        /// </summary>
        /// <param name="i"> The index of the current arc being examined. </param>
        /// <param name="item1IsFree"> Boolean variable that indicates if the first item of the arc is unconnected. </param>
        /// <param name="item2IsFree"> Boolean variable that indicates if the second item of the arc is unconnected. </param>
        /// <param name="outerPoints"> The list with all of the cover testing endpoints free to bond with the selectors. </param>
        static private void AddRemainingOuterPoints(int i, bool item1IsFree, bool item2IsFree, ref List<int> outerPoints)
        {
            if (item1IsFree)
            {
                outerPoints.Add(i * 12 + 6);
            }
            if (item2IsFree)
            {
                outerPoints.Add(i * 12 + 12);
            }
        }

        /// <summary>
        /// Connects the remaining outerpoints from all of the cover testing to the selector vertex
        /// </summary>
        /// <param name="vertexCoverSize"> Size of the vertex cover. </param>
        /// <param name="newVertexNumber"> Number of vertex of the output graph. </param>
        /// <param name="outerPoints"> The List containing all of the unconnected outer points of all of the cover testings. </param>
        /// <param name="newArcs"> The HashSet containing all of the arcs of the output graph. </param>
        static private void ConnectSelectors(int vertexCoverSize, int newVertexNumber, List<int> outerPoints, ref HashSet<(int, int)> newArcs)
        {
            for (int i = 0; i < outerPoints.Count; i++)
            {
                for (int j = 0; j < vertexCoverSize; j++)
                {
                    newArcs.Add((outerPoints[i], newVertexNumber - j));
                }
            }
        }

        /// <summary>
        /// Transforms the input of a Vertex Cover problem into the input of a Hamiltonian Circuit problem
        /// </summary>
        /// <param name="inputGraph"> The graph that was going to be tested for vertex cover. </param>
        /// <param name="vertexCoverSize"> The expected size of the vertex cover. </param>
        /// <returns></returns>
        static public Graph VC2HC(Graph inputGraph, int vertexCoverSize)
        {
            List<(int, int)> arcsList = new List<(int, int)>(inputGraph.arcs);
            HashSet<(int, int)> newArcs = new HashSet<(int, int)>();

            // Crear CoverTesting Vertex y Selectors
            int newVertexNumber = arcsList.Count * 12 + vertexCoverSize;         
            List<int> outerPoints = new List<int>();
            HashSet<int> startedPaths = new HashSet<int>();

            // Conectar CoverTesting
            for (int i = 0; i < arcsList.Count; i++)
            {
                bool item1IsFree = true;
                bool item2IsFree = true;

                AddInitialOuterPoints(i, arcsList[i], ref outerPoints, ref startedPaths);

                if (arcsList[i].Item1 == arcsList[i].Item2)
                {
                    newArcs.Add((i * 12 + 6, i * 12 + 7));
                    item1IsFree = false;
                }

                for (int j = i + 1; j < arcsList.Count && (item1IsFree || item2IsFree); j++)
                {
                    if (item1IsFree)
                    {
                        if (arcsList[i].Item1 == arcsList[j].Item1)
                        {
                            newArcs.Add((i * 12 + 6, j * 12 + 1));
                            item1IsFree = false;
                        }
                        else if (arcsList[i].Item1 == arcsList[j].Item2)
                        {
                            newArcs.Add((i * 12 + 6, j * 12 + 7));
                            item1IsFree = false;
                        }
                    }
                    if (item2IsFree)
                    {
                        if (arcsList[i].Item2 == arcsList[j].Item1)
                        {
                            newArcs.Add((i * 12 + 12, j * 12 + 1));
                            item2IsFree = false;
                        }
                        else if (arcsList[i].Item2 == arcsList[j].Item2)
                        {
                            newArcs.Add((i * 12 + 12, j * 12 + 7));
                            item2IsFree = false;
                        }
                    }
                }
                AddCoverTestingArcs(i, ref newArcs);
                AddRemainingOuterPoints(i, item1IsFree, item2IsFree, ref outerPoints);
            }
            ConnectSelectors(vertexCoverSize, newVertexNumber, outerPoints, ref newArcs);
            return new Graph(newVertexNumber, newArcs);
        }
    }
}
