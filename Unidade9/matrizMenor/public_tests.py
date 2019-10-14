import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
matriz_menor = getattr(undertest, 'matriz_menor', None)

class PublicTests(unittest.TestCase):

    def test_1(self):
        M1 = [[1,2,3], [13,14,15], [7,8,9]]
        M2= [[10,11,12], [4,5,6], [7,8,9]]
        M3= [[1,2,3], [0,0,0], [7,8,9]]
        
        assert matriz_menor(M1, M2) == [[1,2,3],[4,5,6],[7,8,9]]
        assert matriz_menor(M1, M3) == [[1,2,3],[0,0,0],[7,8,9]]
        
if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
