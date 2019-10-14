import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
transposta = getattr(undertest, 'transposta', None)

class PublicTests(unittest.TestCase):

    def test_simples(self):
        M = [[1,1,1,1],[2,2,2,2],[3,3,3,3]]
        assert transposta(M) == [[1,2,3],[1,2,3],[1,2,3],[1,2,3]]
        assert M == [[1,1,1,1],[2,2,2,2],[3,3,3,3]]
        
if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
