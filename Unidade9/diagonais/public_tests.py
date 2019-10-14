import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
diagonais = getattr(undertest, 'diagonais', None)

class PublicTests(unittest.TestCase):

    def test_1(self):
        M = [[1,2,3], [4,5,6], [7,8,9]]
        assert diagonais(M) == [[1,5,9],[3,5,7]]
        
if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
