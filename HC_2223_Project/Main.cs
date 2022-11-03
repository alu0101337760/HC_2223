using System;
namespace HC_2223_Project
{
    public class Program
    {
        public static void Main(string filename)
        {
            //Console.WriteLine(VCToHCConverter.VC2HC(new Graph(filename), 3));
            Graph grafo = new Graph(filename);
            Console.WriteLine(grafo.ToString());
        }
    }
}