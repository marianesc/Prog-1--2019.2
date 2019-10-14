import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
reducoes = getattr(undertest, 'reducoes', None)

class PublicTests(unittest.TestCase):

    def test_exemplo(self):
        assert reducoes([4, 2, 0, 6, 3, 4]) == [2, 2, 0, 3, 0]

    def test_exemplo2(self):
        assert reducoes([3, 0, 3, 6, 1]) == [3, 0, 0, 5]

if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
