import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
zera_acima_ou_abaixo = getattr(undertest, 'zera_acima_ou_abaixo', None)

class PublicTests(unittest.TestCase):

    def test_exemplo_1(self):
        M = [[1,2,3],
             [4,5,6],
             [7,8,9]]
        zera_acima_ou_abaixo(M)
        assert M == [[1,2,3],
                     [0,5,6],
                     [0,0,9]]
        
if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
