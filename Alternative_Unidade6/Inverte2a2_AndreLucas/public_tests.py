import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
inverte2a2_condicional = getattr(undertest, 'inverte2a2_condicional', None)


class PublicTests(unittest.TestCase):

    def test_simples(self):
        seq = [3,1,2,3,10,5,6]                  
        inverte2a2_condicional(seq)
        assert seq == [1,3,2,3,5,10,6]

    def test_2(self):
        seq = [5,4,3,2,1]
        inverte2a2_condicional(seq)
        assert seq == [4,5,2,3,1]

if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
