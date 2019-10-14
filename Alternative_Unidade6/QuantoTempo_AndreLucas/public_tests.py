import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
quanto_tempo = getattr(undertest, 'quanto_tempo', None)

class PublicTests(unittest.TestCase):

   def test_exemplo(self):
     assert  quanto_tempo("07:15", "09:18") == "2 hora(s) e 3 minuto(s)"

if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
