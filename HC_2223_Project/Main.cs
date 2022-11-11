using System;
namespace HC_2223_Project
{
    public class Program
    {
        public static void Main(String[] args)
        {
            //Console.WriteLine(VCToHCConverter.VC2HC(new Graph(filename), 3));
            Graph grafo = new Graph(args[0]);
            Console.WriteLine(grafo.ToString());
            Graph hc = VCToHCConverter.VC2HC(grafo, 3);
            Console.WriteLine(hc.ToString());
            Console.WriteLine();
        }
    }
}