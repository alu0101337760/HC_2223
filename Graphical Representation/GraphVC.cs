using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GraphVC
{
  public int numberOfVertex { get; private set; }
  public HashSet<(int, int)> arcs { get; private set; }

  /// <summary>
  /// Constructor.
  /// </summary>
  /// <param name="numberOfVertex"> The number of vertex in the graph. </param>
  /// <param name="arcs"> The arcs between the graph vertex. </param>
  public GraphVC(int numberOfVertex, HashSet<(int, int)> arcs)
  {
    this.numberOfVertex = numberOfVertex;
    this.arcs = arcs;
  }

  /// <summary>
  ///  Constructor from filename.
  /// </summary>
  /// <param name="filename"> Filename to read with encoded graph information. </param>
  public GraphVC(string filename)
  {
    InitializeFromFile(filename);
  }

  /// <summary>
  /// Builds the graph from a given file.
  /// </summary>
  /// <param name="filename"> The name of the file to build the graph from. </param>
  private void InitializeFromFile(string filename)
  {
    string[] lines = System.IO.File.ReadAllLines(filename);
    numberOfVertex = int.Parse(lines[0]);
    arcs = new HashSet<(int, int)>();
    for (int i = 1; i < lines.Length; ++i)
    {
      string[] line = lines[i].Split(' ');
      arcs.Add((int.Parse(line[0]), int.Parse(line[1])));
    }
  }

  /// <summary>
  /// Returns a string containing the graph information.
  /// </summary>
  /// <returns> A string containing the graph information. </returns>
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
