using System;
using System.Security.Cryptography.X509Certificates;

int option=0;
int height = 0;
int width = 0;

Console.WriteLine("Enter 1 for Rectangle, 2 For Triangle or 3 to Exit");
try
{
    option = Int32.Parse(Console.ReadLine()!);
} catch {
    Console.WriteLine("Wrong input type");
}
//כל עוד לא הוזן 3 ליציאה
while (option!=3)
{
    //קליטת רוחב וגובה
    if (option == 1 || option == 2)
    {
        try
        {
            Console.WriteLine("Enter width:");
            width = Int32.Parse(Console.ReadLine()!);
            Console.WriteLine("Enter Height:");
            height = Int32.Parse(Console.ReadLine()!);
        }
        catch { Console.WriteLine("wront input type"); }
    }
    //במקרה 1 - מלבן
    if (option == 1)
    {
        Console.WriteLine("Rectangle");
        if (width == height || Math.Abs(height - width) > 5)
            Console.WriteLine("Area: " + height * width);
        else Console.WriteLine("Perimeter: " + (height * 2 + width * 2));
    }
    //מקרה 2 - משולש
    else if (option == 2)
    {
        Console.WriteLine("Triangle");
        option = 0;
        do
        {
            Console.WriteLine("Enter 1 for Triangle Perimeter or 2 to Print the Triangle");
            try
            {
                option = Int32.Parse(Console.ReadLine()!);
            }
            catch
            {
                Console.WriteLine("wront input type");
            }
        }
        while (option != 1 && option != 2);
        //חישוב היקף משולש
        if (option == 1)
            Console.WriteLine("Perimeter: " + (width + 2 * (Math.Sqrt(Math.Pow(Convert.ToDouble(width) / 2, 2) + Math.Pow(height, 2)))));
        else if (width % 2 == 0 || width - 2 * height > 0)
                Console.WriteLine("Unable to Print Triangle");
            else
            {
                if (width - 2 * height < 0)
                {
                    string line = "";
                    //שורה ראשונה
                    for (int i = 0; i < width / 2; i++)
                        line += " ";
                    Console.WriteLine(line + "*");
                    //שורות ביניים
                    int len = 1;
                    if (((width - 2) / 2) == 0)
                    {
                        for (int i = 0; i < (height - 2); i++)
                        {
                            line = "";
                            for (int j = 0; j < width; j++)
                                line += "*";
                            Console.WriteLine(line);
                        }
                    }
                    else for (int i = 0; i < (width - 2) / 2; i++)
                        {
                            len += 2;
                            if (i == 0)
                            {
                                for (int j = 0; j < (height - 2) / ((width - 2) / 2) + (height - 2) % ((width - 2) / 2); j++)
                                {
                                    line = "";
                                    for (int k = 0; k < (width - len) / 2; k++)
                                        line += " ";
                                    for (int k = 0; k < len; k++)
                                        line += "*";
                                    Console.WriteLine(line);
                                }
                            }
                            else for (int j = 0; j < (height - 2) / ((width - 2) / 2); j++)
                                {
                                    line = "";
                                    for (int k = 0; k < (width - len) / 2; k++)
                                        line += " ";
                                    for (int k = 0; k < len; k++)
                                        line += "*";
                                    Console.WriteLine(line);
                                }
                        }
                    //שורה סופית
                    line = "";
                    for (int i = 0; i < width; i++)
                        line += "*";
                    Console.WriteLine(line);
                }
            }
    }
    Console.WriteLine("Enter 1 for Rectangle, 2 For Triangle ans 3 to Exit");
    try
    {
        option = Int32.Parse(Console.ReadLine()!);
    }
    catch
    {
        Console.WriteLine("Wrong input");
    }
}
Console.WriteLine("GoodBye!");
