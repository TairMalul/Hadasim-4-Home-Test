using System;
using System.Security.Cryptography.X509Certificates;

int option=0;

Console.WriteLine("Enter 1 for Rectangle, 2 For Triangle ans 3 to Exit");
option = Int32.Parse(Console.ReadLine()!);

while (option!=3)
{
    Console.WriteLine("Enter width:");
    int width = Int32.Parse(Console.ReadLine()!);
    Console.WriteLine("Enter Height:");
    int height = Int32.Parse(Console.ReadLine()!);
    if (option == 1)
    {
        Console.WriteLine("Rectangle");
        if (width == height || Math.Abs(height - width) > 5)
            Console.WriteLine("Area: " + height * width);
        else Console.WriteLine("Perimeter: " + (height * 2 + width * 2));
    }
    else if (option == 2)
    {
        do
        {
            Console.WriteLine("Enter 1 for Triangle Perimeter or 2 to Print the Triangle");
            option = Int32.Parse(Console.ReadLine()!);
        }
        while (option != 1 && option != 2);
        if (option == 1)
            Console.WriteLine("Perimeter: " + (width + 2 * (Math.Sqrt(Math.Pow(Convert.ToDouble(width/2), 2) + Math.Pow(height, 2)))));
        else if (width % 2 == 0 || width - 2 * height > 0)
            Console.WriteLine("Unable to Print Triangle");
        else
        {
            if(width-2*height < 0)
            {
                string line = "";
                //first line
                for (int i = 0; i < width / 2; i++)
                    line += "";
                Console.WriteLine(line+"*");
                //middle lines
                int len = 1;
                for (int i = 0;i < (width-2)/2; i++)
                {
                    len += 2;
                    if(i==0)
                    {
                        for (int j = 0; j < (height - 2) / ((width - 2) / 2)+ (height - 2) % ((width - 2) / 2); j++)
                        {
                            line = "";
                            for(int k = 0;k<len;k++)
                            line += "*";
                            Console.WriteLine(line);
                        }
                    }
                    else for (int j = 0; j < (height-2)/((width-2)/2); j++)
                    {
                        line = "";
                        for(int k = 0;k<len;k++)
                        line += "*";
                        Console.WriteLine(line);
                    }
                }
                line = "";
                for (int i = 0; i < width; i++)
                    line +="*";
                Console.WriteLine(line);
            }
        }
    }
    Console.WriteLine("Enter 1 for Rectangle, 2 For Triangle ans 3 to Exit");
    option = Int32.Parse(Console.ReadLine()!);
}
Console.WriteLine("GoodBye!");
