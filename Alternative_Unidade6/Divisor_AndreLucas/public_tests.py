import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
divisor = getattr(undertest, 'divisor', None)

class PublicTests(unittest.TestCase):

    def test_exemplo(self):
        lista1 = [100,10,40,50]
        lista2 = [3,15,50,23,5]
        assert divisor(10, lista1) == 0
        assert divisor(5, lista2) == 1
        
if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
