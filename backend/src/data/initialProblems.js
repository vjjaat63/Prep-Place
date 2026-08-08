export const PROBLEMS = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]
console.log(twoSum([3, 3], 6)); // Expected: [0, 1]`,
      python: `def twoSum(nums, target):
    # Write your solution here
    pass

# Test cases
print(twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(twoSum([3, 2, 4], 6))  # Expected: [1, 2]
print(twoSum([3, 3], 6))  # Expected: [0, 1]`,
      java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9))); // Expected: [0, 1]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 2, 4}, 6))); // Expected: [1, 2]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 3}, 6))); // Expected: [0, 1]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {2, 7, 11, 15};
    vector<int> res1 = sol.twoSum(nums1, 9);
    if(res1.size() == 2) cout << "[" << res1[0] << ", " << res1[1] << "]" << endl;
    else cout << "[]" << endl;

    vector<int> nums2 = {3, 2, 4};
    vector<int> res2 = sol.twoSum(nums2, 6);
    if(res2.size() == 2) cout << "[" << res2[0] << ", " << res2[1] << "]" << endl;
    else cout << "[]" << endl;

    vector<int> nums3 = {3, 3};
    vector<int> res3 = sol.twoSum(nums3, 6);
    if(res3.size() == 2) cout << "[" << res3[0] << ", " << res3[1] << "]" << endl;
    else cout << "[]" << endl;
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
      cpp: "[0, 1]\n[1, 2]\n[0, 1]",
    },
  },

  "reverse-string": {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Write a function that reverses a string. The input string is given as an array of characters s.",
      notes: ["You must do this by modifying the input array in-place with O(1) extra memory."],
    },
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character"],
    starterCode: {
      javascript: `function reverseString(s) {
  // Write your solution here
  
}

// Test cases
let test1 = ["h","e","l","l","o"];
reverseString(test1);
console.log(test1); // Expected: ["o","l","l","e","h"]

let test2 = ["H","a","n","n","a","h"];
reverseString(test2);
console.log(test2); // Expected: ["h","a","n","n","a","H"]`,
      python: `def reverseString(s):
    # Write your solution here
    pass

# Test cases
test1 = ["h","e","l","l","o"]
reverseString(test1)
print(test1)  # Expected: ["o","l","l","e","h"]

test2 = ["H","a","n","n","a","h"]
reverseString(test2)
print(test2)  # Expected: ["h","a","n","n","a","H"]`,
      java: `import java.util.*;

class Solution {
    public static void reverseString(char[] s) {
        // Write your solution here
        
    }
    
    public static void main(String[] args) {
        char[] test1 = {'h','e','l','l','o'};
        reverseString(test1);
        System.out.println(Arrays.toString(test1)); // Expected: [o, l, l, e, h]
        
        char[] test2 = {'H','a','n','n','a','h'};
        reverseString(test2);
        System.out.println(Arrays.toString(test2)); // Expected: [h, a, n, n, a, H]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    void reverseString(vector<char>& s) {
        // Write your solution here
        
    }
};

void printVector(const vector<char>& v) {
    cout << "[";
    for(size_t i=0; i<v.size(); ++i){
        cout << v[i];
        if(i != v.size()-1) cout << ", ";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<char> test1 = {'h','e','l','l','o'};
    sol.reverseString(test1);
    printVector(test1); // Expected: [o, l, l, e, h]

    vector<char> test2 = {'H','a','n','n','a','h'};
    sol.reverseString(test2);
    printVector(test2); // Expected: [h, a, n, n, a, H]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
      python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']",
      java: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
      cpp: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
    },
  },

  "valid-palindrome": {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.",
      notes: ["Given a string s, return true if it is a palindrome, or false otherwise."],
    },
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.',
      },
      {
        input: 's = " "',
        output: "true",
        explanation:
          's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 2 * 10⁵", "s consists only of printable ASCII characters"],
    starterCode: {
      javascript: `function isPalindrome(s) {
  // Write your solution here
  
}

// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
console.log(isPalindrome("race a car")); // Expected: false
console.log(isPalindrome(" ")); // Expected: true`,
      python: `def isPalindrome(s):
    # Write your solution here
    pass

# Test cases
print(isPalindrome("A man, a plan, a canal: Panama"))  # Expected: True
print(isPalindrome("race a car"))  # Expected: False
print(isPalindrome(" "))  # Expected: True`,
      java: `class Solution {
    public static boolean isPalindrome(String s) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
        System.out.println(isPalindrome("race a car")); // Expected: false
        System.out.println(isPalindrome(" ")); // Expected: true
    }
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        // Write your solution here
        
        return false;
    }
};

int main() {
    Solution sol;
    cout << (sol.isPalindrome("A man, a plan, a canal: Panama") ? "true" : "false") << endl;
    cout << (sol.isPalindrome("race a car") ? "true" : "false") << endl;
    cout << (sol.isPalindrome(" ") ? "true" : "false") << endl;
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse\ntrue",
      python: "True\nFalse\nTrue",
      java: "true\nfalse\ntrue",
      cpp: "true\nfalse\ntrue",
    },
  },

  "maximum-subarray": {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    description: {
      text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1.",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Write your solution here
  
}

// Test cases
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Expected: 6
console.log(maxSubArray([1])); // Expected: 1
console.log(maxSubArray([5,4,-1,7,8])); // Expected: 23`,
      python: `def maxSubArray(nums):
    # Write your solution here
    pass

# Test cases
print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 6
print(maxSubArray([1]))  # Expected: 1
print(maxSubArray([5,4,-1,7,8]))  # Expected: 23`,
      java: `class Solution {
    public static int maxSubArray(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4})); // Expected: 6
        System.out.println(maxSubArray(new int[]{1})); // Expected: 1
        System.out.println(maxSubArray(new int[]{5,4,-1,7,8})); // Expected: 23
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {-2,1,-3,4,-1,2,1,-5,4};
    cout << sol.maxSubArray(nums1) << endl;

    vector<int> nums2 = {1};
    cout << sol.maxSubArray(nums2) << endl;

    vector<int> nums3 = {5,4,-1,7,8};
    cout << sol.maxSubArray(nums3) << endl;
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "6\n1\n23",
      python: "6\n1\n23",
      java: "6\n1\n23",
      cpp: "6\n1\n23",
    },
  },

  "container-with-most-water": {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
      notes: [
        "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        "Return the maximum amount of water a container can store.",
        "Notice that you may not slant the container.",
      ],
    },
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.",
      },
      {
        input: "height = [1,1]",
        output: "1",
      },
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxArea(height) {
  // Write your solution here
  
}

// Test cases
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // Expected: 49
console.log(maxArea([1,1])); // Expected: 1`,
      python: `def maxArea(height):
    # Write your solution here
    pass

# Test cases
print(maxArea([1,8,6,2,5,4,8,3,7]))  # Expected: 49
print(maxArea([1,1]))  # Expected: 1`,
      java: `class Solution {
    public static int maxArea(int[] height) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7})); // Expected: 49
        System.out.println(maxArea(new int[]{1,1})); // Expected: 1
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> height1 = {1,8,6,2,5,4,8,3,7};
    cout << sol.maxArea(height1) << endl;

    vector<int> height2 = {1,1};
    cout << sol.maxArea(height2) << endl;
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "49\n1",
      python: "49\n1",
      java: "49\n1",
      cpp: "49\n1",
    },
  },

  "best-time-to-buy-and-sell-stock": {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array • Dynamic Programming",
    description: {
      text: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
      notes: [
        "Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
      ],
    },
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation:
          "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.",
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "In this case, no transactions are done and the max profit = 0.",
      },
    ],
    constraints: [
      "1 ≤ prices.length ≤ 10⁵",
      "0 ≤ prices[i] ≤ 10⁴",
    ],
    starterCode: {
      javascript: `function maxProfit(prices) {
        // Write your solution here
        
        }
        
        // Test cases
        console.log(maxProfit([7,1,5,3,6,4])); // Expected: 5
console.log(maxProfit([7,6,4,3,1]));  // Expected: 0`,
      python: `def maxProfit(prices):
      # Write your solution here
    pass
    
    # Test cases
    print(maxProfit([7,1,5,3,6,4]))  # Expected: 5
print(maxProfit([7,6,4,3,1]))    # Expected: 0`,
      java: `class Solution {
    public static int maxProfit(int[] prices) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxProfit(new int[]{7,1,5,3,6,4})); // Expected: 5
        System.out.println(maxProfit(new int[]{7,6,4,3,1}));   // Expected: 0
        }
        }`,
      cpp: `#include <iostream>
        #include <vector>

        using namespace std;
        
        class Solution {
          public:
          int maxProfit(vector<int>& prices) {
            // Write your solution here
            
            return 0;
            }
            };
            
            int main() {
              Solution sol;
              vector<int> prices1 = {7,1,5,3,6,4};
              cout << sol.maxProfit(prices1) << endl;  // Expected: 5
              
              vector<int> prices2 = {7,6,4,3,1};
              cout << sol.maxProfit(prices2) << endl;  // Expected: 0
              return 0;
              }`,
    },
    expectedOutput: {
      javascript: "5\n0",
      python: "5\n0",
      java: "5\n0",
      cpp: "5\n0",
    },
  },

  "valid-parentheses": {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack • String",
    description: {
      text: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      notes: [
        "An input string is valid if:",
        "1. Open brackets must be closed by the same type of brackets.",
        "2. Open brackets must be closed in the correct order.",
        "3. Every close bracket has a corresponding open bracket of the same type.",
      ],
    },
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
      {
        input: 's = "([])"',
        output: "true",
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 10⁴",
      "s consists of parentheses only '()[]{}'.",
    ],
    starterCode: {
      javascript: `function isValid(s) {
  // Write your solution here
  
  }
  
  // Test cases
  console.log(isValid("()"));     // Expected: true
console.log(isValid("()[]{}")); // Expected: true
console.log(isValid("(]"));     // Expected: false
console.log(isValid("([])"));   // Expected: true`,
      python: `def isValid(s):
    # Write your solution here
    pass
    
# Test cases
print(isValid("()"))      # Expected: True
print(isValid("()[]{}"))  # Expected: True
print(isValid("(]"))      # Expected: False
print(isValid("([])"))    # Expected: True`,
      java: `class Solution {
    public static boolean isValid(String s) {
        // Write your solution here
        
        return false;
        }
        
        public static void main(String[] args) {
          System.out.println(isValid("()"));     // Expected: true
          System.out.println(isValid("()[]{}")); // Expected: true
          System.out.println(isValid("(]"));     // Expected: false
          System.out.println(isValid("([])"));   // Expected: true
    }
    }`,
      cpp: `#include <iostream>
    #include <string>
    
    using namespace std;
    
    class Solution {
      public:
      bool isValid(string s) {
        // Write your solution here
        
        return false;
        }
        };
        
        int main() {
          Solution sol;
          cout << (sol.isValid("()") ? "true" : "false") << endl;
          cout << (sol.isValid("()[]{}") ? "true" : "false") << endl;
          cout << (sol.isValid("(]") ? "true" : "false") << endl;
          cout << (sol.isValid("([])") ? "true" : "false") << endl;
          return 0;
          }`,
    },
    expectedOutput: {
      javascript: "true\ntrue\nfalse\ntrue",
      python: "True\nTrue\nFalse\nTrue",
      java: "true\ntrue\nfalse\ntrue",
      cpp: "true\ntrue\nfalse\ntrue",
    },
  },

  "search-in-rotated-sorted-array": {
    id: "search-in-rotated-sorted-array",

    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Array • Binary Search",
    description: {
      text: "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 ≤ k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed).",
      notes: [
        "Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
        "You must write an algorithm with O(log n) runtime complexity.",
      ],
    },
    examples: [
      {
        input: "nums = [4,5,6,7,0,1,2], target = 0",
        output: "4",
      },
      {
        input: "nums = [4,5,6,7,0,1,2], target = 3",
        output: "-1",
      },
      {
        input: "nums = [1], target = 0",
        output: "-1",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 5000",
      "-10⁴ ≤ nums[i] ≤ 10⁴",
      "All values of nums are unique.",
      "nums is guaranteed to be rotated at some pivot.",
      "-10⁴ ≤ target ≤ 10⁴",
    ],
    starterCode: {
      javascript: `function search(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(search([4,5,6,7,0,1,2], 0)); // Expected: 4
console.log(search([4,5,6,7,0,1,2], 3)); // Expected: -1
console.log(search([1], 0));              // Expected: -1`,
      python: `def search(nums, target):
    # Write your solution here
    pass

# Test cases
print(search([4,5,6,7,0,1,2], 0))  # Expected: 4
print(search([4,5,6,7,0,1,2], 3))  # Expected: -1
print(search([1], 0))               # Expected: -1`,
      java: `class Solution {
    public static int search(int[] nums, int target) {
        // Write your solution here
        
        return -1;
    }
    
    public static void main(String[] args) {
        System.out.println(search(new int[]{4,5,6,7,0,1,2}, 0)); // Expected: 4
        System.out.println(search(new int[]{4,5,6,7,0,1,2}, 3)); // Expected: -1
        System.out.println(search(new int[]{1}, 0));              // Expected: -1
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Write your solution here
        
        return -1;
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {4,5,6,7,0,1,2};
    cout << sol.search(nums1, 0) << endl;  // Expected: 4
    cout << sol.search(nums1, 3) << endl;  // Expected: -1

    vector<int> nums2 = {1};
    cout << sol.search(nums2, 0) << endl;  // Expected: -1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "4\n-1\n-1",
      python: "4\n-1\n-1",
      java: "4\n-1\n-1",
      cpp: "4\n-1\n-1",
    },
  },

  "3sum": {
    id: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
      notes: [
        "Notice that the solution set must not contain duplicate triplets.",
      ],
    },
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation:
          "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2].",
      },
      {
        input: "nums = [0,1,1]",
        output: "[]",
      },
      {
        input: "nums = [0,0,0]",
        output: "[[0,0,0]]",
      },
    ],
    constraints: [
      "0 ≤ nums.length ≤ 3000",
      "-10⁵ ≤ nums[i] ≤ 10⁵",
    ],
    starterCode: {
      javascript: `function threeSum(nums) {
  // Write your solution here
  
}

// Test cases
console.log(threeSum([-1,0,1,2,-1,-4])); // Expected: [[-1,-1,2],[-1,0,1]]
console.log(threeSum([0,1,1]));          // Expected: []
console.log(threeSum([0,0,0]));          // Expected: [[0,0,0]]`,
      python: `def threeSum(nums):
    # Write your solution here
    pass

# Test cases
print(threeSum([-1,0,1,2,-1,-4]))  # Expected: [[-1,-1,2],[-1,0,1]]
print(threeSum([0,1,1]))           # Expected: []
print(threeSum([0,0,0]))           # Expected: [[0,0,0]]`,
      java: `import java.util.*;

class Solution {
    public static List<List<Integer>> threeSum(int[] nums) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(threeSum(new int[]{-1,0,1,2,-1,-4})); // Expected: [[-1,-1,2],[-1,0,1]]
        System.out.println(threeSum(new int[]{0,1,1}));          // Expected: []
        System.out.println(threeSum(new int[]{0,0,0}));          // Expected: [[0,0,0]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        // Write your solution here
        
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {-1,0,1,2,-1,-4};
    auto res1 = sol.threeSum(nums1);
    // Print logic omitted for brevity
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[-1,-1,2],[-1,0,1]]\n[]\n[[0,0,0]]",
      python: "[[-1, -1, 2], [-1, 0, 1]]\n[]\n[[0, 0, 0]]",
      java: "[[-1, -1, 2], [-1, 0, 1]]\n[]\n[[0, 0, 0]]",
      cpp: "[[-1, -1, 2], [-1, 0, 1]]\n[]\n[[0, 0, 0]]",
    },
  },

  "longest-substring-without-repeating-characters": {
    id: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String • Sliding Window",
    description: {
      text: "Given a string s, find the length of the longest substring without repeating characters.",
      notes: [],
    },
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation:
          'The answer is "wke", with the length of 3. Notice that "pwke" is a subsequence, not a substring.',
      },
    ],
    constraints: [
      "0 ≤ s.length ≤ 5 * 10⁴",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  
}

// Test cases
console.log(lengthOfLongestSubstring("abcabcbb")); // Expected: 3
console.log(lengthOfLongestSubstring("bbbbb"));    // Expected: 1
console.log(lengthOfLongestSubstring("pwwkew"));   // Expected: 3`,
      python: `def lengthOfLongestSubstring(s):
    # Write your solution here
    pass

# Test cases
print(lengthOfLongestSubstring("abcabcbb"))  # Expected: 3
print(lengthOfLongestSubstring("bbbbb"))     # Expected: 1
print(lengthOfLongestSubstring("pwwkew"))    # Expected: 3`,
      java: `class Solution {
    public static int lengthOfLongestSubstring(String s) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // Expected: 3
        System.out.println(lengthOfLongestSubstring("bbbbb"));    // Expected: 1
        System.out.println(lengthOfLongestSubstring("pwwkew"));   // Expected: 3
    }
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.lengthOfLongestSubstring("abcabcbb") << endl; // Expected: 3
    cout << sol.lengthOfLongestSubstring("bbbbb") << endl;    // Expected: 1
    cout << sol.lengthOfLongestSubstring("pwwkew") << endl;   // Expected: 3
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n1\n3",
      python: "3\n1\n3",
      java: "3\n1\n3",
      cpp: "3\n1\n3",
    },
  },
  "longest-repeating-character-replacement": {
    id: "longest-repeating-character-replacement",
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    category: "String • Sliding Window • Hash Table",
    description: {
      text: "You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.",
      notes: [
        "Return the length of the longest substring containing the same letter you can get after performing the above operations.",
      ],
    },
    examples: [
      {
        input: 's = "ABAB", k = 2',
        output: "4",
        explanation: "Replace the two 'A's with two 'B's or vice versa.",
      },
      {
        input: 's = "AABABBA", k = 1',
        output: "4",
        explanation:
          "Replace the one 'A' in the middle with 'B' and you get 'AABBBBA' (substring 'BBBB' has length 4).",
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 10⁵",
      "s consists of only uppercase English letters",
      "0 ≤ k ≤ s.length",
    ],
    starterCode: {
      javascript: `function characterReplacement(s, k) {
  // Write your solution here
  
}

// Test cases
console.log(characterReplacement("ABAB", 2));    // Expected: 4
console.log(characterReplacement("AABABBA", 1)); // Expected: 4`,
      python: `def characterReplacement(s, k):
    # Write your solution here
    pass

# Test cases
print(characterReplacement("ABAB", 2))     # Expected: 4
print(characterReplacement("AABABBA", 1))  # Expected: 4`,
      java: `class Solution {
    public static int characterReplacement(String s, int k) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(characterReplacement("ABAB", 2));    // Expected: 4
        System.out.println(characterReplacement("AABABBA", 1)); // Expected: 4
    }
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    int characterReplacement(string s, int k) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.characterReplacement("ABAB", 2) << endl;    // Expected: 4
    cout << sol.characterReplacement("AABABBA", 1) << endl; // Expected: 4
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "4\n4",
      python: "4\n4",
      java: "4\n4",
      cpp: "4\n4",
    },
  },

  "permutation-in-string": {
    id: "permutation-in-string",
    title: "Permutation in String",
    difficulty: "Medium",
    category: "String • Sliding Window • Hash Table",
    description: {
      text: "Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.",
      notes: [
        "In other words, return true if one of s1's permutations is the substring of s2.",
      ],
    },
    examples: [
      {
        input: 's1 = "ab", s2 = "eidbaooo"',
        output: "true",
        explanation: 's2 contains one permutation of s1 ("ba").',
      },
      {
        input: 's1 = "ab", s2 = "eidboaoo"',
        output: "false",
      },
    ],
    constraints: [
      "1 ≤ s1.length, s2.length ≤ 10⁴",
      "s1 and s2 consist of lowercase English letters.",
    ],
    starterCode: {
      javascript: `function checkInclusion(s1, s2) {
  // Write your solution here
  
}

// Test cases
console.log(checkInclusion("ab", "eidbaooo"));  // Expected: true
console.log(checkInclusion("ab", "eidboaoo"));  // Expected: false`,
      python: `def checkInclusion(s1, s2):
    # Write your solution here
    pass

# Test cases
print(checkInclusion("ab", "eidbaooo"))  # Expected: True
print(checkInclusion("ab", "eidboaoo"))  # Expected: False`,
      java: `class Solution {
    public static boolean checkInclusion(String s1, String s2) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(checkInclusion("ab", "eidbaooo")); // Expected: true
        System.out.println(checkInclusion("ab", "eidboaoo")); // Expected: false
    }
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        // Write your solution here
        
        return false;
    }
};

int main() {
    Solution sol;
    cout << (sol.checkInclusion("ab", "eidbaooo") ? "true" : "false") << endl; // Expected: true
    cout << (sol.checkInclusion("ab", "eidboaoo") ? "true" : "false") << endl; // Expected: false
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
      cpp: "true\nfalse",
    },
  },

  "valid-sudoku": {
    id: "valid-sudoku",
    title: "Valid Sudoku",
    difficulty: "Medium",
    category: "Array • Hash Table • Matrix",
    description: {
      text: "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:",
      notes: [
        "Each row must contain the digits 1-9 without repetition.",
        "Each column must contain the digits 1-9 without repetition.",
        "Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.",
        "A partially filled board can be valid but is not necessarily solvable.",
        "Only the filled cells need to be validated.",
      ],
    },
    examples: [
      {
        input: `board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]`,
        output: "true",
      },
      {
        input: `board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]`,
        output: "false",
        explanation:
          "Top-left 3x3 sub-box has two 8's.",
      },
    ],
    constraints: [
      "board.length == 9",
      "board[i].length == 9",
      "board[i][j] is a digit 1-9 or '.'.",
    ],
    starterCode: {
      javascript: `function isValidSudoku(board) {
  // Write your solution here
  
}

// Test cases
const board1 = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
];
const board2 = [
  ["8","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
];
console.log(isValidSudoku(board1)); // Expected: true
console.log(isValidSudoku(board2)); // Expected: false`,
      python: `def isValidSudoku(board):
    # Write your solution here
    pass

# Test cases
board1 = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
]
board2 = [
    ["8","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
]
print(isValidSudoku(board1))  # Expected: True
print(isValidSudoku(board2))  # Expected: False`,
      java: `class Solution {
    public static boolean isValidSudoku(char[][] board) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        char[][] board1 = {
            {'5','3','.','.','7','.','.','.','.'},
            {'6','.','.','1','9','5','.','.','.'},
            {'.','9','8','.','.','.','.','6','.'},
            {'8','.','.','.','6','.','.','.','3'},
            {'4','.','.','8','.','3','.','.','1'},
            {'7','.','.','.','2','.','.','.','6'},
            {'.','6','.','.','.','.','2','8','.'},
            {'.','.','.','4','1','9','.','.','5'},
            {'.','.','.','.','8','.','.','7','9'}
        };
        char[][] board2 = {
            {'8','3','.','.','7','.','.','.','.'},
            {'6','.','.','1','9','5','.','.','.'},
            {'.','9','8','.','.','.','.','6','.'},
            {'8','.','.','.','6','.','.','.','3'},
            {'4','.','.','8','.','3','.','.','1'},
            {'7','.','.','.','2','.','.','.','6'},
            {'.','6','.','.','.','.','2','8','.'},
            {'.','.','.','4','1','9','.','.','5'},
            {'.','.','.','.','8','.','.','7','9'}
        };
        System.out.println(isValidSudoku(board1)); // Expected: true
        System.out.println(isValidSudoku(board2)); // Expected: false
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        // Write your solution here
        
        return false;
    }
};

int main() {
    Solution sol;
    vector<vector<char>> board1 = {
        {'5','3','.','.','7','.','.','.','.'},
        {'6','.','.','1','9','5','.','.','.'},
        {'.','9','8','.','.','.','.','6','.'},
        {'8','.','.','.','6','.','.','.','3'},
        {'4','.','.','8','.','3','.','.','1'},
        {'7','.','.','.','2','.','.','.','6'},
        {'.','6','.','.','.','.','2','8','.'},
        {'.','.','.','4','1','9','.','.','5'},
        {'.','.','.','.','8','.','.','7','9'}
    };
    vector<vector<char>> board2 = {
        {'8','3','.','.','7','.','.','.','.'},
        {'6','.','.','1','9','5','.','.','.'},
        {'.','9','8','.','.','.','.','6','.'},
        {'8','.','.','.','6','.','.','.','3'},
        {'4','.','.','8','.','3','.','.','1'},
        {'7','.','.','.','2','.','.','.','6'},
        {'.','6','.','.','.','.','2','8','.'},
        {'.','.','.','4','1','9','.','.','5'},
        {'.','.','.','.','8','.','.','7','9'}
    };
    cout << (sol.isValidSudoku(board1) ? "true" : "false") << endl; // Expected: true
    cout << (sol.isValidSudoku(board2) ? "true" : "false") << endl; // Expected: false
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
      cpp: "true\nfalse",
    },
  },

  "top-k-frequent-elements": {
    id: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "Array • Hash Table • Heap",
    description: {
      text: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [1,1,1,2,2,3], k = 2",
        output: "[1,2]",
      },
      {
        input: "nums = [1], k = 1",
        output: "[1]",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 10⁵",
      "k is in the range [1, the number of unique elements in the array]",
      "It is guaranteed that the answer is unique.",
      "Follow up: Your algorithm's time complexity must be better than O(n log n).",
    ],
    starterCode: {
      javascript: `function topKFrequent(nums, k) {
  // Write your solution here
  
}

// Test cases
console.log(topKFrequent([1,1,1,2,2,3], 2)); // Expected: [1,2] (order may vary)
console.log(topKFrequent([1], 1));            // Expected: [1]`,
      python: `def topKFrequent(nums, k):
    # Write your solution here
    pass

# Test cases
print(topKFrequent([1,1,1,2,2,3], 2))  # Expected: [1,2] (order may vary)
print(topKFrequent([1], 1))             # Expected: [1]`,
      java: `import java.util.*;

class Solution {
    public static int[] topKFrequent(int[] nums, int k) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(topKFrequent(new int[]{1,1,1,2,2,3}, 2))); // Expected: [1,2] (order may vary)
        System.out.println(Arrays.toString(topKFrequent(new int[]{1}, 1)));            // Expected: [1]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<int>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << v[i];
        if (i != v.size()-1) cout << ", ";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<int> nums1 = {1,1,1,2,2,3};
    vector<int> res1 = sol.topKFrequent(nums1, 2);
    printVector(res1);  // Expected: [1, 2] (order may vary)

    vector<int> nums2 = {1};
    vector<int> res2 = sol.topKFrequent(nums2, 1);
    printVector(res2);  // Expected: [1]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,2]\n[1]",
      python: "[1, 2]\n[1]",
      java: "[1, 2]\n[1]",
      cpp: "[1, 2]\n[1]",
    },
  },

  "product-of-array-except-self": {
    id: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Array • Prefix Sum",
    description: {
      text: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
      notes: [
        "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
        "You must write an algorithm that runs in O(n) time and without using the division operation.",
      ],
    },
    examples: [
      {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]",
      },
      {
        input: "nums = [-1,1,0,-3,3]",
        output: "[0,0,9,0,0]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁵",
      "-30 ≤ nums[i] ≤ 30",
      "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
    ],
    starterCode: {
      javascript: `function productExceptSelf(nums) {
  // Write your solution here
  
}

// Test cases
console.log(productExceptSelf([1,2,3,4]));      // Expected: [24,12,8,6]
console.log(productExceptSelf([-1,1,0,-3,3]));  // Expected: [0,0,9,0,0]`,
      python: `def productExceptSelf(nums):
    # Write your solution here
    pass

# Test cases
print(productExceptSelf([1,2,3,4]))       # Expected: [24, 12, 8, 6]
print(productExceptSelf([-1,1,0,-3,3]))   # Expected: [0, 0, 9, 0, 0]`,
      java: `import java.util.*;

class Solution {
    public static int[] productExceptSelf(int[] nums) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(productExceptSelf(new int[]{1,2,3,4})));      // Expected: [24, 12, 8, 6]
        System.out.println(Arrays.toString(productExceptSelf(new int[]{-1,1,0,-3,3})));  // Expected: [0, 0, 9, 0, 0]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<int>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << v[i];
        if (i != v.size()-1) cout << ", ";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<int> nums1 = {1,2,3,4};
    vector<int> res1 = sol.productExceptSelf(nums1);
    printVector(res1);  // Expected: [24, 12, 8, 6]

    vector<int> nums2 = {-1,1,0,-3,3};
    vector<int> res2 = sol.productExceptSelf(nums2);
    printVector(res2);  // Expected: [0, 0, 9, 0, 0]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[24,12,8,6]\n[0,0,9,0,0]",
      python: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]",
      java: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]",
      cpp: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]",
    },
  },

  "contains-duplicate": {
    "id": "contains-duplicate",
    "title": "Contains Duplicate",
    "difficulty": "Easy",
    "category": "Array • Hash Table",
    "description": {
      "text": "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
      "notes": []
    },
    "examples": [
      { "input": "nums = [1,2,3,1]", "output": "true" },
      { "input": "nums = [1,2,3,4]", "output": "false" },
      { "input": "nums = [1,1,1,3,3,4,3,2,4,2]", "output": "true" }
    ],
    "constraints": ["1 ≤ nums.length ≤ 10⁵", "-10⁹ ≤ nums[i] ≤ 10⁹"],
    "starterCode": {
      "javascript": "function containsDuplicate(nums) {\n  // Write your solution here\n  \n}\n\n// Test cases\nconsole.log(containsDuplicate([1,2,3,1])); // Expected: true\nconsole.log(containsDuplicate([1,2,3,4])); // Expected: false\nconsole.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2])); // Expected: true",
      "python": "def containsDuplicate(nums):\n    # Write your solution here\n    pass\n\n# Test cases\nprint(containsDuplicate([1,2,3,1]))  # Expected: True\nprint(containsDuplicate([1,2,3,4]))  # Expected: False\nprint(containsDuplicate([1,1,1,3,3,4,3,2,4,2]))  # Expected: True",
      "java": "import java.util.*;\n\nclass Solution {\n    public static boolean containsDuplicate(int[] nums) {\n        // Write your solution here\n        \n        return false;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(containsDuplicate(new int[]{1,2,3,1})); // Expected: true\n        System.out.println(containsDuplicate(new int[]{1,2,3,4})); // Expected: false\n        System.out.println(containsDuplicate(new int[]{1,1,1,3,3,4,3,2,4,2})); // Expected: true\n    }\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        // Write your solution here\n        \n        return false;\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> nums1 = {1,2,3,1};\n    cout << (sol.containsDuplicate(nums1) ? \"true\" : \"false\") << endl;\n    vector<int> nums2 = {1,2,3,4};\n    cout << (sol.containsDuplicate(nums2) ? \"true\" : \"false\") << endl;\n    vector<int> nums3 = {1,1,1,3,3,4,3,2,4,2};\n    cout << (sol.containsDuplicate(nums3) ? \"true\" : \"false\") << endl;\n    return 0;\n}"
    },
    "expectedOutput": {
      "javascript": "true\nfalse\ntrue",
      "python": "True\nFalse\nTrue",
      "java": "true\nfalse\ntrue",
      "cpp": "true\nfalse\ntrue"
    }
  },
  "valid-anagram": {
    "id": "valid-anagram",
    "title": "Valid Anagram",
    "difficulty": "Easy",
    "category": "String • Hash Table",
    "description": {
      "text": "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
      "notes": ["An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once."]
    },
    "examples": [
      { "input": "s = \"anagram\", t = \"nagaram\"", "output": "true" },
      { "input": "s = \"rat\", t = \"car\"", "output": "false" }
    ],
    "constraints": ["1 ≤ s.length, t.length ≤ 5 * 10⁴", "s and t consist of lowercase English letters."],
    "starterCode": {
      "javascript": "function isAnagram(s, t) {\n  // Write your solution here\n  \n}\n\n// Test cases\nconsole.log(isAnagram(\"anagram\", \"nagaram\")); // Expected: true\nconsole.log(isAnagram(\"rat\", \"car\")); // Expected: false",
      "python": "def isAnagram(s, t):\n    # Write your solution here\n    pass\n\n# Test cases\nprint(isAnagram(\"anagram\", \"nagaram\"))  # Expected: True\nprint(isAnagram(\"rat\", \"car\"))  # Expected: False",
      "java": "class Solution {\n    public static boolean isAnagram(String s, String t) {\n        // Write your solution here\n        \n        return false;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(isAnagram(\"anagram\", \"nagaram\")); // Expected: true\n        System.out.println(isAnagram(\"rat\", \"car\")); // Expected: false\n    }\n}",
      "cpp": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        // Write your solution here\n        \n        return false;\n    }\n};\n\nint main() {\n    Solution sol;\n    cout << (sol.isAnagram(\"anagram\", \"nagaram\") ? \"true\" : \"false\") << endl;\n    cout << (sol.isAnagram(\"rat\", \"car\") ? \"true\" : \"false\") << endl;\n    return 0;\n}"
    },
    "expectedOutput": {
      "javascript": "true\nfalse",
      "python": "True\nFalse",
      "java": "true\nfalse",
      "cpp": "true\nfalse"
    }
  },
  "two-sum": {
    "id": "two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "category": "Array • Hash Table",
    "description": {
      "text": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      "notes": ["You may assume that each input would have exactly one solution, and you may not use the same element twice.", "You can return the answer in any order."]
    },
    "examples": [
      { "input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { "input": "nums = [3,2,4], target = 6", "output": "[1,2]" },
      { "input": "nums = [3,3], target = 6", "output": "[0,1]" }
    ],
    "constraints": ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "-10⁹ ≤ target ≤ 10⁹", "Only one valid answer exists."],
    "starterCode": {
      "javascript": "function twoSum(nums, target) {\n  // Write your solution here\n  \n}\n\n// Test cases\nconsole.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]\nconsole.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]\nconsole.log(twoSum([3, 3], 6)); // Expected: [0, 1]",
      "python": "def twoSum(nums, target):\n    # Write your solution here\n    pass\n\n# Test cases\nprint(twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]\nprint(twoSum([3, 2, 4], 6))  # Expected: [1, 2]\nprint(twoSum([3, 3], 6))  # Expected: [0, 1]",
      "java": "import java.util.*;\n\nclass Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        \n        return new int[0];\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9))); // Expected: [0, 1]\n        System.out.println(Arrays.toString(twoSum(new int[]{3, 2, 4}, 6))); // Expected: [1, 2]\n        System.out.println(Arrays.toString(twoSum(new int[]{3, 3}, 6))); // Expected: [0, 1]\n    }\n}",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        \n        return {};\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> nums1 = {2, 7, 11, 15};\n    vector<int> res1 = sol.twoSum(nums1, 9);\n    if(res1.size() == 2) cout << \"[\" << res1[0] << \", \" << res1[1] << \"]\" << endl;\n    else cout << \"[]\" << endl;\n\n    vector<int> nums2 = {3, 2, 4};\n    vector<int> res2 = sol.twoSum(nums2, 6);\n    if(res2.size() == 2) cout << \"[\" << res2[0] << \", \" << res2[1] << \"]\" << endl;\n    else cout << \"[]\" << endl;\n\n    vector<int> nums3 = {3, 3};\n    vector<int> res3 = sol.twoSum(nums3, 6);\n    if(res3.size() == 2) cout << \"[\" << res3[0] << \", \" << res3[1] << \"]\" << endl;\n    else cout << \"[]\" << endl;\n    return 0;\n}"
    },
    "expectedOutput": {
      "javascript": "[0,1]\n[1,2]\n[0,1]",
      "python": "[0, 1]\n[1, 2]\n[0, 1]",
      "java": "[0, 1]\n[1, 2]\n[0, 1]",
      "cpp": "[0, 1]\n[1, 2]\n[0, 1]"
    }
  },
  "group-anagrams": {
    "id": "group-anagrams",
    "title": "Group Anagrams",
    "difficulty": "Medium",
    "category": "Array • Hash Table • String",
    "description": {
      "text": "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
      "notes": ["An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once."]
    },
    "examples": [
      { "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]" },
      { "input": "strs = [\"\"]", "output": "[[\"\"]]" },
      { "input": "strs = [\"a\"]", "output": "[[\"a\"]]" }
    ],
    "constraints": ["1 ≤ strs.length ≤ 10⁴", "0 ≤ strs[i].length ≤ 100", "strs[i] consists of lowercase English letters."],
    "starterCode": {
      "javascript": "function groupAnagrams(strs) {\n  // Write your solution here\n  \n}\n\n// Test cases\nconsole.log(groupAnagrams([\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]));\nconsole.log(groupAnagrams([\"\"]));\nconsole.log(groupAnagrams([\"a\"]));",
      "python": "def groupAnagrams(strs):\n    # Write your solution here\n    pass\n\n# Test cases\nprint(groupAnagrams([\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]))\nprint(groupAnagrams([\"\"]))\nprint(groupAnagrams([\"a\"]))",
      "java": "import java.util.*;\n\nclass Solution {\n    public static List<List<String>> groupAnagrams(String[] strs) {\n        // Write your solution here\n        \n        return new ArrayList<>();\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(groupAnagrams(new String[]{\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"}));\n        System.out.println(groupAnagrams(new String[]{\"\"}));\n        System.out.println(groupAnagrams(new String[]{\"a\"}));\n    }\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        // Write your solution here\n        \n        return {};\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<string> strs1 = {\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"};\n    auto res1 = sol.groupAnagrams(strs1);\n    // Output not printed fully; placeholder\n    return 0;\n}"
    },
    "expectedOutput": {
      "javascript": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]\n[[\"\"]]\n[[\"a\"]]",
      "python": "[[\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]]\n[[\"\"]]\n[[\"a\"]]",
      "java": "[[bat], [nat, tan], [ate, eat, tea]]\n[[]]\n[[a]]",
      "cpp": "(similar grouping)"
    }
  },
  "encode-and-decode-strings": {
    id: "encode-and-decode-strings",
    title: "Encode and Decode Strings",
    difficulty: "Medium",
    category: "Array • String • Design",
    description: {
      text: "Design an algorithm to encode a list of strings to a single string. The encoded string is then decoded back to the original list of strings.",
      notes: [
        "Implement two functions: encode(strs) and decode(s).",
        "The strings may contain any possible characters out of 256 valid ASCII characters.",
        "Do not use any class/global variables to store states. Your encode and decode algorithms should be stateless.",
      ],
    },
    examples: [
      {
        input: 'strs = ["neet","code","love","you"]',
        output: '["neet","code","love","you"]',
        explanation: "encode: list → string, decode: string → list. The decoded list must equal the original.",
      },
      {
        input: 'strs = ["we", "say", ":", "yes"]',
        output: '["we", "say", ":", "yes"]',
      },
      {
        input: 'strs = [""]',
        output: '[""]',
      },
    ],
    constraints: [
      "1 ≤ strs.length ≤ 200",
      "0 ≤ strs[i].length ≤ 200",
      "strs[i] contains any possible 256 ASCII characters.",
    ],
    starterCode: {
      javascript: `function encode(strs) {
  // Write your solution here
  
}

function decode(s) {
  // Write your solution here
  
}

// Test cases
const input1 = ["neet","code","love","you"];
const encoded1 = encode(input1);
console.log(decode(encoded1)); // Expected: ["neet","code","love","you"]

const input2 = ["we", "say", ":", "yes"];
const encoded2 = encode(input2);
console.log(decode(encoded2)); // Expected: ["we", "say", ":", "yes"]

const input3 = [""];
const encoded3 = encode(input3);
console.log(decode(encoded3)); // Expected: [""]`,
      python: `def encode(strs):
    # Write your solution here
    pass

def decode(s):
    # Write your solution here
    pass

# Test cases
input1 = ["neet","code","love","you"]
encoded1 = encode(input1)
print(decode(encoded1))  # Expected: ["neet","code","love","you"]

input2 = ["we", "say", ":", "yes"]
encoded2 = encode(input2)
print(decode(encoded2))  # Expected: ["we", "say", ":", "yes"]

input3 = [""]
encoded3 = encode(input3)
print(decode(encoded3))  # Expected: [""]`,
      java: `import java.util.*;

class Solution {
    public static String encode(List<String> strs) {
        // Write your solution here
        
        return "";
    }
    
    public static List<String> decode(String s) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        List<String> input1 = Arrays.asList("neet","code","love","you");
        String enc1 = encode(input1);
        System.out.println(decode(enc1)); // Expected: [neet, code, love, you]
        
        List<String> input2 = Arrays.asList("we", "say", ":", "yes");
        String enc2 = encode(input2);
        System.out.println(decode(enc2)); // Expected: [we, say, :, yes]
        
        List<String> input3 = Arrays.asList("");
        String enc3 = encode(input3);
        System.out.println(decode(enc3)); // Expected: []
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    string encode(vector<string>& strs) {
        // Write your solution here
        
        return "";
    }
    
    vector<string> decode(string s) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<string>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << "\\"" << v[i] << "\\"";
        if (i != v.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<string> input1 = {"neet","code","love","you"};
    string enc1 = sol.encode(input1);
    vector<string> dec1 = sol.decode(enc1);
    printVector(dec1); // Expected: ["neet","code","love","you"]
    
    vector<string> input2 = {"we", "say", ":", "yes"};
    string enc2 = sol.encode(input2);
    vector<string> dec2 = sol.decode(enc2);
    printVector(dec2);
    
    vector<string> input3 = {""};
    string enc3 = sol.encode(input3);
    vector<string> dec3 = sol.decode(enc3);
    printVector(dec3);
    return 0;
}`,
    },
    expectedOutput: {
      javascript: `["neet","code","love","you"]\n["we","say",":","yes"]\n[""]`,
      python: `["neet", "code", "love", "you"]\n["we", "say", ":", "yes"]\n[""]`,
      java: `[neet, code, love, you]\n[we, say, :, yes]\n[]`,
      cpp: `["neet", "code", "love", "you"]\n["we", "say", ":", "yes"]\n[""]`,
    },
  },

  "longest-consecutive-sequence": {
    id: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    category: "Array • Hash Table • Union Find",
    description: {
      text: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.",
      notes: [
        "You must write an algorithm that runs in O(n) time.",
      ],
    },
    examples: [
      {
        input: "nums = [100,4,200,1,3,2]",
        output: "4",
        explanation: "The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.",
      },
      {
        input: "nums = [0,3,7,2,5,8,4,6,0,1]",
        output: "9",
      },
    ],
    constraints: [
      "0 ≤ nums.length ≤ 10⁵",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
    ],
    starterCode: {
      javascript: `function longestConsecutive(nums) {
  // Write your solution here
  
}

// Test cases
console.log(longestConsecutive([100,4,200,1,3,2]));    // Expected: 4
console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1])); // Expected: 9`,
      python: `def longestConsecutive(nums):
    # Write your solution here
    pass

# Test cases
print(longestConsecutive([100,4,200,1,3,2]))     # Expected: 4
print(longestConsecutive([0,3,7,2,5,8,4,6,0,1])) # Expected: 9`,
      java: `class Solution {
    public static int longestConsecutive(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(longestConsecutive(new int[]{100,4,200,1,3,2}));    // Expected: 4
        System.out.println(longestConsecutive(new int[]{0,3,7,2,5,8,4,6,0,1})); // Expected: 9
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {100,4,200,1,3,2};
    cout << sol.longestConsecutive(nums1) << endl; // Expected: 4

    vector<int> nums2 = {0,3,7,2,5,8,4,6,0,1};
    cout << sol.longestConsecutive(nums2) << endl; // Expected: 9
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "4\n9",
      python: "4\n9",
      java: "4\n9",
      cpp: "4\n9",
    },
  },

  "two-sum-ii-input-array-is-sorted": {
    id: "two-sum-ii-input-array-is-sorted",
    title: "Two Sum II Input Array Is Sorted",
    difficulty: "Medium",
    category: "Array • Two Pointers • Binary Search",
    description: {
      text: "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.",
      notes: [
        "Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.",
        "The tests are generated such that there is exactly one solution. You may not use the same element twice.",
        "Your solution must use only constant extra space.",
      ],
    },
    examples: [
      {
        input: "numbers = [2,7,11,15], target = 9",
        output: "[1,2]",
        explanation: "The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].",
      },
      {
        input: "numbers = [2,3,4], target = 6",
        output: "[1,3]",
        explanation: "The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].",
      },
      {
        input: "numbers = [-1,0], target = -1",
        output: "[1,2]",
        explanation: "The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].",
      },
    ],
    constraints: [
      "2 ≤ numbers.length ≤ 3 * 10⁴",
      "-1000 ≤ numbers[i] ≤ 1000",
      "numbers is sorted in non-decreasing order.",
      "-1000 ≤ target ≤ 1000",
      "The tests are generated such that there is exactly one solution.",
    ],
    starterCode: {
      javascript: `function twoSum(numbers, target) {
  // Write your solution here
  
}

// Test cases
console.log(twoSum([2,7,11,15], 9)); // Expected: [1,2]
console.log(twoSum([2,3,4], 6));     // Expected: [1,3]
console.log(twoSum([-1,0], -1));     // Expected: [1,2]`,
      python: `def twoSum(numbers, target):
    # Write your solution here
    pass

# Test cases
print(twoSum([2,7,11,15], 9))  # Expected: [1, 2]
print(twoSum([2,3,4], 6))      # Expected: [1, 3]
print(twoSum([-1,0], -1))      # Expected: [1, 2]`,
      java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] numbers, int target) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2,7,11,15}, 9))); // Expected: [1,2]
        System.out.println(Arrays.toString(twoSum(new int[]{2,3,4}, 6)));     // Expected: [1,3]
        System.out.println(Arrays.toString(twoSum(new int[]{-1,0}, -1)));     // Expected: [1,2]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        // Write your solution here
        
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {2,7,11,15};
    vector<int> res1 = sol.twoSum(nums1, 9);
    if(res1.size()==2) cout << "[" << res1[0] << ", " << res1[1] << "]" << endl;
    else cout << "[]" << endl;

    vector<int> nums2 = {2,3,4};
    vector<int> res2 = sol.twoSum(nums2, 6);
    if(res2.size()==2) cout << "[" << res2[0] << ", " << res2[1] << "]" << endl;
    else cout << "[]" << endl;

    vector<int> nums3 = {-1,0};
    vector<int> res3 = sol.twoSum(nums3, -1);
    if(res3.size()==2) cout << "[" << res3[0] << ", " << res3[1] << "]" << endl;
    else cout << "[]" << endl;
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,2]\n[1,3]\n[1,2]",
      python: "[1, 2]\n[1, 3]\n[1, 2]",
      java: "[1, 2]\n[1, 3]\n[1, 2]",
      cpp: "[1, 2]\n[1, 3]\n[1, 2]",
    },
  },

  "min-stack": {
    id: "min-stack",
    title: "Min Stack",
    difficulty: "Medium",
    category: "Stack • Design",
    description: {
      text: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
      notes: [
        "Implement the MinStack class:",
        "MinStack() initializes the stack object.",
        "void push(int val) pushes the element val onto the stack.",
        "void pop() removes the element on the top of the stack.",
        "int top() gets the top element of the stack.",
        "int getMin() retrieves the minimum element in the stack.",
        "You must implement a solution with O(1) time complexity for each function.",
      ],
    },
    examples: [
      {
        input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
        output: '[null,null,null,null,-3,null,0,-2]',
        explanation:
          "MinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2",
      },
    ],
    constraints: [
      "-2³¹ ≤ val ≤ 2³¹ - 1",
      "Methods pop, top and getMin operations will always be called on non-empty stacks.",
      "At most 3 * 10⁴ calls will be made to push, pop, top, and getMin.",
    ],
    starterCode: {
      javascript: `class MinStack {
  constructor() {
    // Write your solution here
  }
  
  push(val) {
    // Write your solution here
  }
  
  pop() {
    // Write your solution here
  }
  
  top() {
    // Write your solution here
  }
  
  getMin() {
    // Write your solution here
  }
}

// Test case
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // Expected: -3
minStack.pop();
console.log(minStack.top());    // Expected: 0
console.log(minStack.getMin()); // Expected: -2`,
      python: `class MinStack:
    def __init__(self):
        # Write your solution here
        pass

    def push(self, val: int) -> None:
        # Write your solution here
        pass

    def pop(self) -> None:
        # Write your solution here
        pass

    def top(self) -> int:
        # Write your solution here
        pass

    def getMin(self) -> int:
        # Write your solution here
        pass

# Test case
minStack = MinStack()
minStack.push(-2)
minStack.push(0)
minStack.push(-3)
print(minStack.getMin())  # Expected: -3
minStack.pop()
print(minStack.top())     # Expected: 0
print(minStack.getMin())  # Expected: -2`,
      java: `import java.util.*;

class MinStack {
    public MinStack() {
        // Write your solution here
    }
    
    public void push(int val) {
        // Write your solution here
    }
    
    public void pop() {
        // Write your solution here
    }
    
    public int top() {
        // Write your solution here
        return 0;
    }
    
    public int getMin() {
        // Write your solution here
        return 0;
    }
    
    public static void main(String[] args) {
        MinStack minStack = new MinStack();
        minStack.push(-2);
        minStack.push(0);
        minStack.push(-3);
        System.out.println(minStack.getMin()); // Expected: -3
        minStack.pop();
        System.out.println(minStack.top());    // Expected: 0
        System.out.println(minStack.getMin()); // Expected: -2
    }
}`,
      cpp: `#include <iostream>
#include <stack>

using namespace std;

class MinStack {
public:
    MinStack() {
        // Write your solution here
    }
    
    void push(int val) {
        // Write your solution here
    }
    
    void pop() {
        // Write your solution here
    }
    
    int top() {
        // Write your solution here
        return 0;
    }
    
    int getMin() {
        // Write your solution here
        return 0;
    }
};

int main() {
    MinStack minStack;
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    cout << minStack.getMin() << endl; // Expected: -3
    minStack.pop();
    cout << minStack.top() << endl;    // Expected: 0
    cout << minStack.getMin() << endl; // Expected: -2
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "-3\n0\n-2",
      python: "-3\n0\n-2",
      java: "-3\n0\n-2",
      cpp: "-3\n0\n-2",
    },
  },

  "evaluate-reverse-polish-notation": {
    id: "evaluate-reverse-polish-notation",
    title: "Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    category: "Stack • Math",
    description: {
      text: "You are given an array of strings tokens that represents an arithmetic expression in Reverse Polish Notation.",
      notes: [
        "Evaluate the expression. Return an integer that represents the value of the expression.",
        "Note that:",
        "The valid operators are '+', '-', '*', and '/'.",
        "Each operand may be an integer or another expression.",
        "The division between two integers always truncates toward zero.",
        "There will not be any division by zero.",
        "The input represents a valid arithmetic expression in reverse polish notation.",
      ],
    },
    examples: [
      {
        input: 'tokens = ["2","1","+","3","*"]',
        output: "9",
        explanation: "((2 + 1) * 3) = 9",
      },
      {
        input: 'tokens = ["4","13","5","/","+"]',
        output: "6",
        explanation: "(4 + (13 / 5)) = 6",
      },
      {
        input: 'tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]',
        output: "22",
        explanation: "((10 * (6 / ((9 + 3) * -11))) + 17) + 5\n= ((10 * (6 / (12 * -11))) + 17) + 5\n= ((10 * (6 / -132)) + 17) + 5\n= ((10 * 0) + 17) + 5\n= (0 + 17) + 5\n= 17 + 5\n= 22",
      },
    ],
    constraints: [
      "1 ≤ tokens.length ≤ 10⁴",
      "tokens[i] is either an operator: '+', '-', '*', or '/', or an integer in the range [-200, 200].",
    ],
    starterCode: {
      javascript: `function evalRPN(tokens) {
  // Write your solution here
  
}

// Test cases
console.log(evalRPN(["2","1","+","3","*"]));                        // Expected: 9
console.log(evalRPN(["4","13","5","/","+"]));                       // Expected: 6
console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"])); // Expected: 22`,
      python: `def evalRPN(tokens):
    # Write your solution here
    pass

# Test cases
print(evalRPN(["2","1","+","3","*"]))                         # Expected: 9
print(evalRPN(["4","13","5","/","+"]))                        # Expected: 6
print(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"])) # Expected: 22`,
      java: `class Solution {
    public static int evalRPN(String[] tokens) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(evalRPN(new String[]{"2","1","+","3","*"})); // Expected: 9
        System.out.println(evalRPN(new String[]{"4","13","5","/","+"})); // Expected: 6
        System.out.println(evalRPN(new String[]{"10","6","9","3","+","-11","*","/","*","17","+","5","+"})); // Expected: 22
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<string> tokens1 = {"2","1","+","3","*"};
    cout << sol.evalRPN(tokens1) << endl; // Expected: 9

    vector<string> tokens2 = {"4","13","5","/","+"};
    cout << sol.evalRPN(tokens2) << endl; // Expected: 6

    vector<string> tokens3 = {"10","6","9","3","+","-11","*","/","*","17","+","5","+"};
    cout << sol.evalRPN(tokens3) << endl; // Expected: 22
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "9\n6\n22",
      python: "9\n6\n22",
      java: "9\n6\n22",
      cpp: "9\n6\n22",
    },
  },
  "generate-parentheses": {
    id: "generate-parentheses",
    title: "Generate Parentheses",
    difficulty: "Medium",
    category: "Stack • Backtracking",
    description: {
      text: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
      notes: [],
    },
    examples: [
      {
        input: "n = 3",
        output: '["((()))","(()())","(())()","()(())","()()()"]',
      },
      {
        input: "n = 1",
        output: '["()"]',
      },
    ],
    constraints: ["1 ≤ n ≤ 8"],
    starterCode: {
      javascript: `function generateParenthesis(n) {
  // Write your solution here
  
}

// Test cases
console.log(generateParenthesis(3)); // Expected: ["((()))","(()())","(())()","()(())","()()()"]
console.log(generateParenthesis(1)); // Expected: ["()"]`,
      python: `def generateParenthesis(n):
    # Write your solution here
    pass

# Test cases
print(generateParenthesis(3))  # Expected: ["((()))","(()())","(())()","()(())","()()()"]
print(generateParenthesis(1))  # Expected: ["()"]`,
      java: `import java.util.*;

class Solution {
    public static List<String> generateParenthesis(int n) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(generateParenthesis(3)); // Expected: [((())), (()()), (())(), ()(()), ()()()]
        System.out.println(generateParenthesis(1)); // Expected: [()]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<string> generateParenthesis(int n) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<string>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << "\\"" << v[i] << "\\"";
        if (i != v.size()-1) cout << ", ";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<string> res1 = sol.generateParenthesis(3);
    printVector(res1); // Expected: ["((()))","(()())","(())()","()(())","()()()"]
    
    vector<string> res2 = sol.generateParenthesis(1);
    printVector(res2); // Expected: ["()"]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: `["((()))","(()())","(())()","()(())","()()()"]\n["()"]`,
      python: `["((()))", "(()())", "(())()", "()(())", "()()()"]\n["()"]`,
      java: `[((())), (()()), (())(), ()(()), ()()()]\n[()]`,
      cpp: `["((()))", "(()())", "(())()", "()(())", "()()()"]\n["()"]`,
    },
  },

  "daily-temperatures": {
    id: "daily-temperatures",
    title: "Daily Temperatures",
    difficulty: "Medium",
    category: "Stack • Monotonic Stack",
    description: {
      text: "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.",
      notes: [],
    },
    examples: [
      {
        input: "temperatures = [73,74,75,71,69,72,76,73]",
        output: "[1,1,4,2,1,1,0,0]",
      },
      {
        input: "temperatures = [30,40,50,60]",
        output: "[1,1,1,0]",
      },
      {
        input: "temperatures = [30,60,90]",
        output: "[1,1,0]",
      },
    ],
    constraints: [
      "1 ≤ temperatures.length ≤ 10⁵",
      "30 ≤ temperatures[i] ≤ 100",
    ],
    starterCode: {
      javascript: `function dailyTemperatures(temperatures) {
  // Write your solution here
  
}

// Test cases
console.log(dailyTemperatures([73,74,75,71,69,72,76,73])); // Expected: [1,1,4,2,1,1,0,0]
console.log(dailyTemperatures([30,40,50,60]));             // Expected: [1,1,1,0]
console.log(dailyTemperatures([30,60,90]));                // Expected: [1,1,0]`,
      python: `def dailyTemperatures(temperatures):
    # Write your solution here
    pass

# Test cases
print(dailyTemperatures([73,74,75,71,69,72,76,73]))  # Expected: [1,1,4,2,1,1,0,0]
print(dailyTemperatures([30,40,50,60]))               # Expected: [1,1,1,0]
print(dailyTemperatures([30,60,90]))                  # Expected: [1,1,0]`,
      java: `import java.util.*;

class Solution {
    public static int[] dailyTemperatures(int[] temperatures) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(dailyTemperatures(new int[]{73,74,75,71,69,72,76,73}))); // Expected: [1,1,4,2,1,1,0,0]
        System.out.println(Arrays.toString(dailyTemperatures(new int[]{30,40,50,60})));             // Expected: [1,1,1,0]
        System.out.println(Arrays.toString(dailyTemperatures(new int[]{30,60,90})));                // Expected: [1,1,0]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<int>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << v[i];
        if (i != v.size()-1) cout << ", ";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<int> temp1 = {73,74,75,71,69,72,76,73};
    vector<int> res1 = sol.dailyTemperatures(temp1);
    printVector(res1); // Expected: [1,1,4,2,1,1,0,0]
    
    vector<int> temp2 = {30,40,50,60};
    vector<int> res2 = sol.dailyTemperatures(temp2);
    printVector(res2); // Expected: [1,1,1,0]
    
    vector<int> temp3 = {30,60,90};
    vector<int> res3 = sol.dailyTemperatures(temp3);
    printVector(res3); // Expected: [1,1,0]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,1,4,2,1,1,0,0]\n[1,1,1,0]\n[1,1,0]",
      python: "[1, 1, 4, 2, 1, 1, 0, 0]\n[1, 1, 1, 0]\n[1, 1, 0]",
      java: "[1, 1, 4, 2, 1, 1, 0, 0]\n[1, 1, 1, 0]\n[1, 1, 0]",
      cpp: "[1, 1, 4, 2, 1, 1, 0, 0]\n[1, 1, 1, 0]\n[1, 1, 0]",
    },
  },

  "car-fleet": {
    id: "car-fleet",
    title: "Car Fleet",
    difficulty: "Medium",
    category: "Stack • Sorting",
    description: {
      text: "There are n cars going to the same destination along a one-lane road. The destination is target miles away.",
      notes: [
        "You are given two integer array position and speed, both of length n, where position[i] is the position of the ith car and speed[i] is the speed of the ith car (in miles per hour).",
        "A car can never pass another car ahead of it, but it can catch up to it and drive bumper to bumper at the same speed. The faster car will slow down to match the slower car's speed. The distance between these two cars is ignored (i.e., they are assumed to have the same position).",
        "A car fleet is some non-empty set of cars driving at the same position and same speed. Note that a single car is also a car fleet.",
        "If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.",
        "Return the number of car fleets that will arrive at the destination.",
      ],
    },
    examples: [
      {
        input: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
        output: "3",
        explanation:
          "The cars starting at 10 and 8 become a fleet at position 10 (time 1). The car starting at 0 reaches 12 (time 12). The cars at 5 and 3 become a fleet at 6 (time 3). So 3 fleets: fleet1(10,8), fleet2(5,3), fleet3(0).",
      },
      {
        input: "target = 10, position = [3], speed = [3]",
        output: "1",
      },
      {
        input: "target = 100, position = [0,2,4], speed = [4,2,1]",
        output: "1",
        explanation: "All cars end up as one fleet.",
      },
    ],
    constraints: [
      "n == position.length == speed.length",
      "1 ≤ n ≤ 10⁵",
      "0 < target ≤ 10⁶",
      "0 ≤ position[i] < target",
      "All positions are unique.",
      "0 < speed[i] ≤ 10⁶",
    ],
    starterCode: {
      javascript: `function carFleet(target, position, speed) {
  // Write your solution here
  
}

// Test cases
console.log(carFleet(12, [10,8,0,5,3], [2,4,1,1,3])); // Expected: 3
console.log(carFleet(10, [3], [3]));                   // Expected: 1
console.log(carFleet(100, [0,2,4], [4,2,1]));          // Expected: 1`,
      python: `def carFleet(target, position, speed):
    # Write your solution here
    pass

# Test cases
print(carFleet(12, [10,8,0,5,3], [2,4,1,1,3]))  # Expected: 3
print(carFleet(10, [3], [3]))                    # Expected: 1
print(carFleet(100, [0,2,4], [4,2,1]))           # Expected: 1`,
      java: `class Solution {
    public static int carFleet(int target, int[] position, int[] speed) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(carFleet(12, new int[]{10,8,0,5,3}, new int[]{2,4,1,1,3})); // Expected: 3
        System.out.println(carFleet(10, new int[]{3}, new int[]{3}));                   // Expected: 1
        System.out.println(carFleet(100, new int[]{0,2,4}, new int[]{4,2,1}));          // Expected: 1
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> pos1 = {10,8,0,5,3};
    vector<int> spd1 = {2,4,1,1,3};
    cout << sol.carFleet(12, pos1, spd1) << endl; // Expected: 3
    
    vector<int> pos2 = {3};
    vector<int> spd2 = {3};
    cout << sol.carFleet(10, pos2, spd2) << endl; // Expected: 1
    
    vector<int> pos3 = {0,2,4};
    vector<int> spd3 = {4,2,1};
    cout << sol.carFleet(100, pos3, spd3) << endl; // Expected: 1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n1\n1",
      python: "3\n1\n1",
      java: "3\n1\n1",
      cpp: "3\n1\n1",
    },
  },

  "largest-rectangle-in-histogram": {
    id: "largest-rectangle-in-histogram",
    title: "Largest Rectangle In Histogram",
    difficulty: "Hard",
    category: "Stack • Monotonic Stack",
    description: {
      text: "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
      notes: [],
    },
    examples: [
      {
        input: "heights = [2,1,5,6,2,3]",
        output: "10",
        explanation: "The largest rectangle has an area = 10 units (the bars with heights 5 and 6, width 2).",
      },
      {
        input: "heights = [2,4]",
        output: "4",
      },
    ],
    constraints: [
      "1 ≤ heights.length ≤ 10⁵",
      "0 ≤ heights[i] ≤ 10⁴",
    ],
    starterCode: {
      javascript: `function largestRectangleArea(heights) {
  // Write your solution here
  
}

// Test cases
console.log(largestRectangleArea([2,1,5,6,2,3])); // Expected: 10
console.log(largestRectangleArea([2,4]));          // Expected: 4`,
      python: `def largestRectangleArea(heights):
    # Write your solution here
    pass

# Test cases
print(largestRectangleArea([2,1,5,6,2,3]))  # Expected: 10
print(largestRectangleArea([2,4]))           # Expected: 4`,
      java: `class Solution {
    public static int largestRectangleArea(int[] heights) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(largestRectangleArea(new int[]{2,1,5,6,2,3})); // Expected: 10
        System.out.println(largestRectangleArea(new int[]{2,4}));          // Expected: 4
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> heights1 = {2,1,5,6,2,3};
    cout << sol.largestRectangleArea(heights1) << endl; // Expected: 10
    
    vector<int> heights2 = {2,4};
    cout << sol.largestRectangleArea(heights2) << endl; // Expected: 4
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "10\n4",
      python: "10\n4",
      java: "10\n4",
      cpp: "10\n4",
    },
  },

  "binary-search": {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    description: {
      text: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
      notes: ["You must write an algorithm with O(log n) runtime complexity."],
    },
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4",
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 10⁴",
      "-10⁴ < nums[i], target < 10⁴",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order.",
    ],
    starterCode: {
      javascript: `function search(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(search([-1,0,3,5,9,12], 9)); // Expected: 4
console.log(search([-1,0,3,5,9,12], 2)); // Expected: -1`,
      python: `def search(nums, target):
    # Write your solution here
    pass

# Test cases
print(search([-1,0,3,5,9,12], 9))  # Expected: 4
print(search([-1,0,3,5,9,12], 2))  # Expected: -1`,
      java: `class Solution {
    public static int search(int[] nums, int target) {
        // Write your solution here
        
        return -1;
    }
    
    public static void main(String[] args) {
        System.out.println(search(new int[]{-1,0,3,5,9,12}, 9)); // Expected: 4
        System.out.println(search(new int[]{-1,0,3,5,9,12}, 2)); // Expected: -1
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Write your solution here
        
        return -1;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {-1,0,3,5,9,12};
    cout << sol.search(nums, 9) << endl; // Expected: 4
    cout << sol.search(nums, 2) << endl; // Expected: -1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "4\n-1",
      python: "4\n-1",
      java: "4\n-1",
      cpp: "4\n-1",
    },
  },
  "trapping-rain-water": {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Array • Two Pointers • Dynamic Programming",
    description: {
      text: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      notes: [],
    },
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The elevation map is represented by the array. In this case, 6 units of rain water are trapped.",
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9",
      },
    ],
    constraints: [
      "n == height.length",
      "1 ≤ n ≤ 2 * 10⁴",
      "0 ≤ height[i] ≤ 10⁵",
    ],
    starterCode: {
      javascript: `function trap(height) {
  // Write your solution here
  
}

// Test cases
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // Expected: 6
console.log(trap([4,2,0,3,2,5]));              // Expected: 9`,
      python: `def trap(height):
    # Write your solution here
    pass

# Test cases
print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))  # Expected: 6
print(trap([4,2,0,3,2,5]))               # Expected: 9`,
      java: `class Solution {
    public static int trap(int[] height) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1})); // Expected: 6
        System.out.println(trap(new int[]{4,2,0,3,2,5}));              // Expected: 9
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> h1 = {0,1,0,2,1,0,1,3,2,1,2,1};
    cout << sol.trap(h1) << endl; // Expected: 6
    
    vector<int> h2 = {4,2,0,3,2,5};
    cout << sol.trap(h2) << endl; // Expected: 9
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "6\n9",
      python: "6\n9",
      java: "6\n9",
      cpp: "6\n9",
    },
  },

  "minimum-window-substring": {
    id: "minimum-window-substring",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    category: "String • Sliding Window • Hash Table",
    description: {
      text: "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string ''.",
      notes: ["A substring is a contiguous sequence of characters within the string."],
    },
    examples: [
      {
        input: 's = "ADOBECODEBANC", t = "ABC"',
        output: '"BANC"',
        explanation: "The minimum window substring 'BANC' includes 'A', 'B', and 'C' from string t.",
      },
      {
        input: 's = "a", t = "a"',
        output: '"a"',
        explanation: "The entire string s is the minimum window.",
      },
      {
        input: 's = "a", t = "aa"',
        output: '""',
        explanation: "Both 'a's from t must be included in the window. Since the largest window of s only has one 'a', return empty string.",
      },
    ],
    constraints: [
      "m == s.length",
      "n == t.length",
      "1 ≤ m, n ≤ 10⁵",
      "s and t consist of uppercase and lowercase English letters.",
    ],
    starterCode: {
      javascript: `function minWindow(s, t) {
  // Write your solution here
  
}

// Test cases
console.log(minWindow("ADOBECODEBANC", "ABC")); // Expected: "BANC"
console.log(minWindow("a", "a"));               // Expected: "a"
console.log(minWindow("a", "aa"));              // Expected: ""`,
      python: `def minWindow(s, t):
    # Write your solution here
    pass

# Test cases
print(minWindow("ADOBECODEBANC", "ABC"))  # Expected: "BANC"
print(minWindow("a", "a"))                # Expected: "a"
print(minWindow("a", "aa"))               # Expected: ""`,
      java: `class Solution {
    public static String minWindow(String s, String t) {
        // Write your solution here
        
        return "";
    }
    
    public static void main(String[] args) {
        System.out.println(minWindow("ADOBECODEBANC", "ABC")); // Expected: "BANC"
        System.out.println(minWindow("a", "a"));               // Expected: "a"
        System.out.println(minWindow("a", "aa"));              // Expected: ""
    }
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    string minWindow(string s, string t) {
        // Write your solution here
        
        return "";
    }
};

int main() {
    Solution sol;
    cout << sol.minWindow("ADOBECODEBANC", "ABC") << endl; // Expected: "BANC"
    cout << sol.minWindow("a", "a") << endl;               // Expected: "a"
    cout << sol.minWindow("a", "aa") << endl;              // Expected: ""
    return 0;
}`,
    },
    expectedOutput: {
      javascript: `"BANC"\n"a"\n""`,
      python: `"BANC"\n"a"\n""`,
      java: `BANC\na\n`,
      cpp: `BANC\na\n`,
    },
  },

  "reverse-linked-list": {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List • Recursion",
    description: {
      text: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
      notes: [],
    },
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
      },
      {
        input: "head = [1,2]",
        output: "[2,1]",
      },
      {
        input: "head = []",
        output: "[]",
      },
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 ≤ Node.val ≤ 5000",
    ],
    starterCode: {
      javascript: `// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

function reverseList(head) {
  // Write your solution here
  
}

// Helper to create list and print
function createList(arr) {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let curr = head;
  for (let i = 1; i < arr.length; i++) {
    curr.next = new ListNode(arr[i]);
    curr = curr.next;
  }
  return head;
}
function printList(head) {
  let res = [];
  while (head) { res.push(head.val); head = head.next; }
  console.log("[" + res.join(",") + "]");
}

// Test cases
let head1 = createList([1,2,3,4,5]);
let rev1 = reverseList(head1);
printList(rev1); // Expected: [5,4,3,2,1]

let head2 = createList([1,2]);
let rev2 = reverseList(head2);
printList(rev2); // Expected: [2,1]

let head3 = createList([]);
let rev3 = reverseList(head3);
printList(rev3); // Expected: []`,
      python: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head):
    # Write your solution here
    pass

# Helper to create and print list
def createList(arr):
    if not arr: return None
    head = ListNode(arr[0])
    curr = head
    for val in arr[1:]:
        curr.next = ListNode(val)
        curr = curr.next
    return head

def printList(head):
    res = []
    while head:
        res.append(str(head.val))
        head = head.next
    print("[" + ",".join(res) + "]")

# Test cases
head1 = createList([1,2,3,4,5])
rev1 = reverseList(head1)
printList(rev1)  # Expected: [5,4,3,2,1]

head2 = createList([1,2])
rev2 = reverseList(head2)
printList(rev2)  # Expected: [2,1]

head3 = createList([])
rev3 = reverseList(head3)
printList(rev3)  # Expected: []`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public static ListNode reverseList(ListNode head) {
        // Write your solution here
        
        return null;
    }
    
    public static ListNode createList(int[] arr) {
        if (arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode curr = head;
        for (int i = 1; i < arr.length; i++) {
            curr.next = new ListNode(arr[i]);
            curr = curr.next;
        }
        return head;
    }
    
    public static void printList(ListNode head) {
        while (head != null) {
            System.out.print(head.val);
            if (head.next != null) System.out.print(",");
            head = head.next;
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        ListNode head1 = createList(new int[]{1,2,3,4,5});
        ListNode rev1 = reverseList(head1);
        printList(rev1); // Expected: 5,4,3,2,1
        
        ListNode head2 = createList(new int[]{1,2});
        ListNode rev2 = reverseList(head2);
        printList(rev2); // Expected: 2,1
        
        ListNode head3 = createList(new int[]{});
        ListNode rev3 = reverseList(head3);
        printList(rev3); // Expected: (empty line)
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Write your solution here
        
        return nullptr;
    }
};

ListNode* createList(vector<int> arr) {
    if (arr.empty()) return nullptr;
    ListNode* head = new ListNode(arr[0]);
    ListNode* curr = head;
    for (size_t i = 1; i < arr.size(); i++) {
        curr->next = new ListNode(arr[i]);
        curr = curr->next;
    }
    return head;
}

void printList(ListNode* head) {
    while (head) {
        cout << head->val;
        if (head->next) cout << ",";
        head = head->next;
    }
    cout << endl;
}

int main() {
    Solution sol;
    ListNode* head1 = createList({1,2,3,4,5});
    ListNode* rev1 = sol.reverseList(head1);
    printList(rev1); // Expected: 5,4,3,2,1
    
    ListNode* head2 = createList({1,2});
    ListNode* rev2 = sol.reverseList(head2);
    printList(rev2); // Expected: 2,1
    
    ListNode* head3 = createList({});
    ListNode* rev3 = sol.reverseList(head3);
    printList(rev3); // Expected: (empty)
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[5,4,3,2,1]\n[2,1]\n[]",
      python: "[5,4,3,2,1]\n[2,1]\n[]",
      java: "5,4,3,2,1\n2,1\n",
      cpp: "5,4,3,2,1\n2,1\n",
    },
  },

  "merge-two-sorted-lists": {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List • Recursion",
    description: {
      text: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.",
      notes: ["Return the head of the merged linked list."],
    },
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]",
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]",
      },
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 ≤ Node.val ≤ 100",
      "Both list1 and list2 are sorted in non-decreasing order.",
    ],
    starterCode: {
      javascript: `// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

function mergeTwoLists(list1, list2) {
  // Write your solution here
  
}

// Helper functions
function createList(arr) {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let curr = head;
  for (let i = 1; i < arr.length; i++) {
    curr.next = new ListNode(arr[i]);
    curr = curr.next;
  }
  return head;
}
function printList(head) {
  let res = [];
  while (head) { res.push(head.val); head = head.next; }
  console.log("[" + res.join(",") + "]");
}

// Test cases
let l1 = createList([1,2,4]);
let l2 = createList([1,3,4]);
printList(mergeTwoLists(l1, l2)); // Expected: [1,1,2,3,4,4]

let l3 = createList([]);
let l4 = createList([]);
printList(mergeTwoLists(l3, l4)); // Expected: []

let l5 = createList([]);
let l6 = createList([0]);
printList(mergeTwoLists(l5, l6)); // Expected: [0]`,
      python: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeTwoLists(list1, list2):
    # Write your solution here
    pass

# Helper functions
def createList(arr):
    if not arr: return None
    head = ListNode(arr[0])
    curr = head
    for val in arr[1:]:
        curr.next = ListNode(val)
        curr = curr.next
    return head

def printList(head):
    res = []
    while head:
        res.append(str(head.val))
        head = head.next
    print("[" + ",".join(res) + "]")

# Test cases
l1 = createList([1,2,4])
l2 = createList([1,3,4])
printList(mergeTwoLists(l1, l2))  # Expected: [1,1,2,3,4,4]

l3 = createList([])
l4 = createList([])
printList(mergeTwoLists(l3, l4))  # Expected: []

l5 = createList([])
l6 = createList([0])
printList(mergeTwoLists(l5, l6))  # Expected: [0]`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public static ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your solution here
        
        return null;
    }
    
    public static ListNode createList(int[] arr) {
        if (arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode curr = head;
        for (int i = 1; i < arr.length; i++) {
            curr.next = new ListNode(arr[i]);
            curr = curr.next;
        }
        return head;
    }
    
    public static void printList(ListNode head) {
        while (head != null) {
            System.out.print(head.val);
            if (head.next != null) System.out.print(",");
            head = head.next;
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        ListNode l1 = createList(new int[]{1,2,4});
        ListNode l2 = createList(new int[]{1,3,4});
        printList(mergeTwoLists(l1, l2)); // Expected: 1,1,2,3,4,4
        
        ListNode l3 = createList(new int[]{});
        ListNode l4 = createList(new int[]{});
        printList(mergeTwoLists(l3, l4)); // Expected: (empty)
        
        ListNode l5 = createList(new int[]{});
        ListNode l6 = createList(new int[]{0});
        printList(mergeTwoLists(l5, l6)); // Expected: 0
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Write your solution here
        
        return nullptr;
    }
};

ListNode* createList(vector<int> arr) {
    if (arr.empty()) return nullptr;
    ListNode* head = new ListNode(arr[0]);
    ListNode* curr = head;
    for (size_t i = 1; i < arr.size(); i++) {
        curr->next = new ListNode(arr[i]);
        curr = curr->next;
    }
    return head;
}

void printList(ListNode* head) {
    while (head) {
        cout << head->val;
        if (head->next) cout << ",";
        head = head->next;
    }
    cout << endl;
}

int main() {
    Solution sol;
    ListNode* l1 = createList({1,2,4});
    ListNode* l2 = createList({1,3,4});
    printList(sol.mergeTwoLists(l1, l2)); // Expected: 1,1,2,3,4,4
    
    ListNode* l3 = createList({});
    ListNode* l4 = createList({});
    printList(sol.mergeTwoLists(l3, l4)); // Expected: (empty)
    
    ListNode* l5 = createList({});
    ListNode* l6 = createList({0});
    printList(sol.mergeTwoLists(l5, l6)); // Expected: 0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,1,2,3,4,4]\n[]\n[0]",
      python: "[1,1,2,3,4,4]\n[]\n[0]",
      java: "1,1,2,3,4,4\n\n0",
      cpp: "1,1,2,3,4,4\n\n0",
    },
  },

  "add-two-numbers": {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List • Math",
    description: {
      text: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
      notes: ["You may assume the two numbers do not contain any leading zero, except the number 0 itself."],
    },
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807.",
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]",
      },
      {
        input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
        output: "[8,9,9,9,0,0,0,1]",
      },
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 ≤ Node.val ≤ 9",
      "It is guaranteed that the list represents a number that does not have leading zeros.",
    ],
    starterCode: {
      javascript: `// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

function addTwoNumbers(l1, l2) {
  // Write your solution here
  
}

// Helper functions
function createList(arr) {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let curr = head;
  for (let i = 1; i < arr.length; i++) {
    curr.next = new ListNode(arr[i]);
    curr = curr.next;
  }
  return head;
}
function printList(head) {
  let res = [];
  while (head) { res.push(head.val); head = head.next; }
  console.log("[" + res.join(",") + "]");
}

// Test cases
let l1 = createList([2,4,3]);
let l2 = createList([5,6,4]);
printList(addTwoNumbers(l1, l2)); // Expected: [7,0,8]

let l3 = createList([0]);
let l4 = createList([0]);
printList(addTwoNumbers(l3, l4)); // Expected: [0]

let l5 = createList([9,9,9,9,9,9,9]);
let l6 = createList([9,9,9,9]);
printList(addTwoNumbers(l5, l6)); // Expected: [8,9,9,9,0,0,0,1]`,
      python: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1, l2):
    # Write your solution here
    pass

# Helper functions
def createList(arr):
    if not arr: return None
    head = ListNode(arr[0])
    curr = head
    for val in arr[1:]:
        curr.next = ListNode(val)
        curr = curr.next
    return head

def printList(head):
    res = []
    while head:
        res.append(str(head.val))
        head = head.next
    print("[" + ",".join(res) + "]")

# Test cases
l1 = createList([2,4,3])
l2 = createList([5,6,4])
printList(addTwoNumbers(l1, l2))  # Expected: [7,0,8]

l3 = createList([0])
l4 = createList([0])
printList(addTwoNumbers(l3, l4))  # Expected: [0]

l5 = createList([9,9,9,9,9,9,9])
l6 = createList([9,9,9,9])
printList(addTwoNumbers(l5, l6))  # Expected: [8,9,9,9,0,0,0,1]`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Write your solution here
        
        return null;
    }
    
    public static ListNode createList(int[] arr) {
        if (arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode curr = head;
        for (int i = 1; i < arr.length; i++) {
            curr.next = new ListNode(arr[i]);
            curr = curr.next;
        }
        return head;
    }
    
    public static void printList(ListNode head) {
        while (head != null) {
            System.out.print(head.val);
            if (head.next != null) System.out.print(",");
            head = head.next;
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        ListNode l1 = createList(new int[]{2,4,3});
        ListNode l2 = createList(new int[]{5,6,4});
        printList(addTwoNumbers(l1, l2)); // Expected: 7,0,8
        
        ListNode l3 = createList(new int[]{0});
        ListNode l4 = createList(new int[]{0});
        printList(addTwoNumbers(l3, l4)); // Expected: 0
        
        ListNode l5 = createList(new int[]{9,9,9,9,9,9,9});
        ListNode l6 = createList(new int[]{9,9,9,9});
        printList(addTwoNumbers(l5, l6)); // Expected: 8,9,9,9,0,0,0,1
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Write your solution here
        
        return nullptr;
    }
};

ListNode* createList(vector<int> arr) {
    if (arr.empty()) return nullptr;
    ListNode* head = new ListNode(arr[0]);
    ListNode* curr = head;
    for (size_t i = 1; i < arr.size(); i++) {
        curr->next = new ListNode(arr[i]);
        curr = curr->next;
    }
    return head;
}

void printList(ListNode* head) {
    while (head) {
        cout << head->val;
        if (head->next) cout << ",";
        head = head->next;
    }
    cout << endl;
}

int main() {
    Solution sol;
    ListNode* l1 = createList({2,4,3});
    ListNode* l2 = createList({5,6,4});
    printList(sol.addTwoNumbers(l1, l2)); // Expected: 7,0,8
    
    ListNode* l3 = createList({0});
    ListNode* l4 = createList({0});
    printList(sol.addTwoNumbers(l3, l4)); // Expected: 0
    
    ListNode* l5 = createList({9,9,9,9,9,9,9});
    ListNode* l6 = createList({9,9,9,9});
    printList(sol.addTwoNumbers(l5, l6)); // Expected: 8,9,9,9,0,0,0,1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[7,0,8]\n[0]\n[8,9,9,9,0,0,0,1]",
      python: "[7,0,8]\n[0]\n[8,9,9,9,0,0,0,1]",
      java: "7,0,8\n0\n8,9,9,9,0,0,0,1",
      cpp: "7,0,8\n0\n8,9,9,9,0,0,0,1",
    },
  },
  "linked-list-cycle": {
    id: "linked-list-cycle",
    title: "Linked List Cycle",
    difficulty: "Easy",
    category: "Linked List • Two Pointers",
    description: {
      text: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
      notes: [
        "There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.",
        "Return true if there is a cycle, otherwise false.",
        "Can you solve it using O(1) (i.e., constant) memory?",
      ],
    },
    examples: [
      {
        input: "head = [3,2,0,-4], pos = 1",
        output: "true",
        explanation: "There is a cycle where the tail connects to the 1st node (0-indexed).",
      },
      {
        input: "head = [1,2], pos = 0",
        output: "true",
        explanation: "There is a cycle where the tail connects to the 0th node.",
      },
      {
        input: "head = [1], pos = -1",
        output: "false",
        explanation: "There is no cycle.",
      },
    ],
    constraints: [
      "The number of nodes in the list is in the range [0, 10⁴].",
      "-10⁵ ≤ Node.val ≤ 10⁵",
      "pos is -1 or a valid index in the linked list.",
    ],
    starterCode: {
      javascript: `// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

function hasCycle(head) {
  // Write your solution here
  
}

// Helper to create a list with a cycle
function createList(arr, pos) {
  if (arr.length === 0) return null;
  let nodes = [];
  for (let val of arr) nodes.push(new ListNode(val));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i+1];
  if (pos !== -1) nodes[nodes.length-1].next = nodes[pos];
  return nodes[0];
}

// Test cases
let head1 = createList([3,2,0,-4], 1);
console.log(hasCycle(head1)); // Expected: true

let head2 = createList([1,2], 0);
console.log(hasCycle(head2)); // Expected: true

let head3 = createList([1], -1);
console.log(hasCycle(head3)); // Expected: false`,
      python: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def hasCycle(head):
    # Write your solution here
    pass

# Helper to create a list with a cycle
def createList(arr, pos):
    if not arr: return None
    nodes = [ListNode(x) for x in arr]
    for i in range(len(nodes)-1):
        nodes[i].next = nodes[i+1]
    if pos != -1:
        nodes[-1].next = nodes[pos]
    return nodes[0]

# Test cases
head1 = createList([3,2,0,-4], 1)
print(hasCycle(head1))  # Expected: True

head2 = createList([1,2], 0)
print(hasCycle(head2))  # Expected: True

head3 = createList([1], -1)
print(hasCycle(head3))  # Expected: False`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
        next = null;
    }
}

class Solution {
    public static boolean hasCycle(ListNode head) {
        // Write your solution here
        
        return false;
    }
    
    public static ListNode createList(int[] arr, int pos) {
        if (arr.length == 0) return null;
        ListNode[] nodes = new ListNode[arr.length];
        for (int i = 0; i < arr.length; i++) nodes[i] = new ListNode(arr[i]);
        for (int i = 0; i < arr.length - 1; i++) nodes[i].next = nodes[i+1];
        if (pos != -1) nodes[arr.length-1].next = nodes[pos];
        return nodes[0];
    }
    
    public static void main(String[] args) {
        ListNode head1 = createList(new int[]{3,2,0,-4}, 1);
        System.out.println(hasCycle(head1)); // Expected: true
        
        ListNode head2 = createList(new int[]{1,2}, 0);
        System.out.println(hasCycle(head2)); // Expected: true
        
        ListNode head3 = createList(new int[]{1}, -1);
        System.out.println(hasCycle(head3)); // Expected: false
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    bool hasCycle(ListNode *head) {
        // Write your solution here
        
        return false;
    }
};

ListNode* createList(vector<int> arr, int pos) {
    if (arr.empty()) return nullptr;
    vector<ListNode*> nodes(arr.size());
    for (size_t i = 0; i < arr.size(); i++) nodes[i] = new ListNode(arr[i]);
    for (size_t i = 0; i < arr.size()-1; i++) nodes[i]->next = nodes[i+1];
    if (pos != -1) nodes.back()->next = nodes[pos];
    return nodes[0];
}

int main() {
    Solution sol;
    ListNode* head1 = createList({3,2,0,-4}, 1);
    cout << (sol.hasCycle(head1) ? "true" : "false") << endl; // Expected: true
    
    ListNode* head2 = createList({1,2}, 0);
    cout << (sol.hasCycle(head2) ? "true" : "false") << endl; // Expected: true
    
    ListNode* head3 = createList({1}, -1);
    cout << (sol.hasCycle(head3) ? "true" : "false") << endl; // Expected: false
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\ntrue\nfalse",
      python: "True\nTrue\nFalse",
      java: "true\ntrue\nfalse",
      cpp: "true\ntrue\nfalse",
    },
  },

  "remove-nth-node-from-end-of-list": {
    id: "remove-nth-node-from-end-of-list",
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    category: "Linked List • Two Pointers",
    description: {
      text: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
      notes: [],
    },
    examples: [
      {
        input: "head = [1,2,3,4,5], n = 2",
        output: "[1,2,3,5]",
      },
      {
        input: "head = [1], n = 1",
        output: "[]",
      },
      {
        input: "head = [1,2], n = 1",
        output: "[1]",
      },
    ],
    constraints: [
      "The number of nodes in the list is sz.",
      "1 ≤ sz ≤ 30",
      "0 ≤ Node.val ≤ 100",
      "1 ≤ n ≤ sz",
    ],
    starterCode: {
      javascript: `// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

function removeNthFromEnd(head, n) {
  // Write your solution here
  
}

// Helper functions
function createList(arr) {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let curr = head;
  for (let i = 1; i < arr.length; i++) {
    curr.next = new ListNode(arr[i]);
    curr = curr.next;
  }
  return head;
}
function printList(head) {
  let res = [];
  while (head) { res.push(head.val); head = head.next; }
  console.log("[" + res.join(",") + "]");
}

// Test cases
let head1 = createList([1,2,3,4,5]);
printList(removeNthFromEnd(head1, 2)); // Expected: [1,2,3,5]

let head2 = createList([1]);
printList(removeNthFromEnd(head2, 1)); // Expected: []

let head3 = createList([1,2]);
printList(removeNthFromEnd(head3, 1)); // Expected: [1]`,
      python: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeNthFromEnd(head, n):
    # Write your solution here
    pass

# Helper functions
def createList(arr):
    if not arr: return None
    head = ListNode(arr[0])
    curr = head
    for val in arr[1:]:
        curr.next = ListNode(val)
        curr = curr.next
    return head

def printList(head):
    res = []
    while head:
        res.append(str(head.val))
        head = head.next
    print("[" + ",".join(res) + "]")

# Test cases
head1 = createList([1,2,3,4,5])
printList(removeNthFromEnd(head1, 2))  # Expected: [1,2,3,5]

head2 = createList([1])
printList(removeNthFromEnd(head2, 1))  # Expected: []

head3 = createList([1,2])
printList(removeNthFromEnd(head3, 1))  # Expected: [1]`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public static ListNode removeNthFromEnd(ListNode head, int n) {
        // Write your solution here
        
        return null;
    }
    
    public static ListNode createList(int[] arr) {
        if (arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode curr = head;
        for (int i = 1; i < arr.length; i++) {
            curr.next = new ListNode(arr[i]);
            curr = curr.next;
        }
        return head;
    }
    
    public static void printList(ListNode head) {
        while (head != null) {
            System.out.print(head.val);
            if (head.next != null) System.out.print(",");
            head = head.next;
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        ListNode head1 = createList(new int[]{1,2,3,4,5});
        printList(removeNthFromEnd(head1, 2)); // Expected: 1,2,3,5
        
        ListNode head2 = createList(new int[]{1});
        printList(removeNthFromEnd(head2, 1)); // Expected: (empty)
        
        ListNode head3 = createList(new int[]{1,2});
        printList(removeNthFromEnd(head3, 1)); // Expected: 1
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        // Write your solution here
        
        return nullptr;
    }
};

ListNode* createList(vector<int> arr) {
    if (arr.empty()) return nullptr;
    ListNode* head = new ListNode(arr[0]);
    ListNode* curr = head;
    for (size_t i = 1; i < arr.size(); i++) {
        curr->next = new ListNode(arr[i]);
        curr = curr->next;
    }
    return head;
}

void printList(ListNode* head) {
    while (head) {
        cout << head->val;
        if (head->next) cout << ",";
        head = head->next;
    }
    cout << endl;
}

int main() {
    Solution sol;
    ListNode* head1 = createList({1,2,3,4,5});
    printList(sol.removeNthFromEnd(head1, 2)); // Expected: 1,2,3,5
    
    ListNode* head2 = createList({1});
    printList(sol.removeNthFromEnd(head2, 1)); // Expected: (empty)
    
    ListNode* head3 = createList({1,2});
    printList(sol.removeNthFromEnd(head3, 1)); // Expected: 1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,2,3,5]\n[]\n[1]",
      python: "[1,2,3,5]\n[]\n[1]",
      java: "1,2,3,5\n\n1",
      cpp: "1,2,3,5\n\n1",
    },
  },

  "reorder-list": {
    id: "reorder-list",
    title: "Reorder List",
    difficulty: "Medium",
    category: "Linked List • Two Pointers",
    description: {
      text: "You are given the head of a singly linked-list. The list can be represented as: L0 → L1 → … → Ln - 1 → Ln",
      notes: [
        "Reorder the list to be on the following form: L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …",
        "You may not modify the values in the list's nodes. Only nodes themselves may be changed.",
      ],
    },
    examples: [
      {
        input: "head = [1,2,3,4]",
        output: "[1,4,2,3]",
      },
      {
        input: "head = [1,2,3,4,5]",
        output: "[1,5,2,4,3]",
      },
    ],
    constraints: [
      "The number of nodes in the list is in the range [1, 5 * 10⁴].",
      "1 ≤ Node.val ≤ 1000",
    ],
    starterCode: {
      javascript: `// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

function reorderList(head) {
  // Do not return anything, modify head in-place
  // Write your solution here
  
}

// Helper functions
function createList(arr) {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let curr = head;
  for (let i = 1; i < arr.length; i++) {
    curr.next = new ListNode(arr[i]);
    curr = curr.next;
  }
  return head;
}
function printList(head) {
  let res = [];
  while (head) { res.push(head.val); head = head.next; }
  console.log("[" + res.join(",") + "]");
}

// Test cases
let head1 = createList([1,2,3,4]);
reorderList(head1);
printList(head1); // Expected: [1,4,2,3]

let head2 = createList([1,2,3,4,5]);
reorderList(head2);
printList(head2); // Expected: [1,5,2,4,3]`,
      python: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reorderList(head):
    # Do not return anything, modify head in-place.
    # Write your solution here
    pass

# Helper functions
def createList(arr):
    if not arr: return None
    head = ListNode(arr[0])
    curr = head
    for val in arr[1:]:
        curr.next = ListNode(val)
        curr = curr.next
    return head

def printList(head):
    res = []
    while head:
        res.append(str(head.val))
        head = head.next
    print("[" + ",".join(res) + "]")

# Test cases
head1 = createList([1,2,3,4])
reorderList(head1)
printList(head1)  # Expected: [1,4,2,3]

head2 = createList([1,2,3,4,5])
reorderList(head2)
printList(head2)  # Expected: [1,5,2,4,3]`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public static void reorderList(ListNode head) {
        // Write your solution here
        
    }
    
    public static ListNode createList(int[] arr) {
        if (arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode curr = head;
        for (int i = 1; i < arr.length; i++) {
            curr.next = new ListNode(arr[i]);
            curr = curr.next;
        }
        return head;
    }
    
    public static void printList(ListNode head) {
        while (head != null) {
            System.out.print(head.val);
            if (head.next != null) System.out.print(",");
            head = head.next;
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        ListNode head1 = createList(new int[]{1,2,3,4});
        reorderList(head1);
        printList(head1); // Expected: 1,4,2,3
        
        ListNode head2 = createList(new int[]{1,2,3,4,5});
        reorderList(head2);
        printList(head2); // Expected: 1,5,2,4,3
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    void reorderList(ListNode* head) {
        // Write your solution here
        
    }
};

ListNode* createList(vector<int> arr) {
    if (arr.empty()) return nullptr;
    ListNode* head = new ListNode(arr[0]);
    ListNode* curr = head;
    for (size_t i = 1; i < arr.size(); i++) {
        curr->next = new ListNode(arr[i]);
        curr = curr->next;
    }
    return head;
}

void printList(ListNode* head) {
    while (head) {
        cout << head->val;
        if (head->next) cout << ",";
        head = head->next;
    }
    cout << endl;
}

int main() {
    Solution sol;
    ListNode* head1 = createList({1,2,3,4});
    sol.reorderList(head1);
    printList(head1); // Expected: 1,4,2,3
    
    ListNode* head2 = createList({1,2,3,4,5});
    sol.reorderList(head2);
    printList(head2); // Expected: 1,5,2,4,3
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,4,2,3]\n[1,5,2,4,3]",
      python: "[1,4,2,3]\n[1,5,2,4,3]",
      java: "1,4,2,3\n1,5,2,4,3",
      cpp: "1,4,2,3\n1,5,2,4,3",
    },
  },

  "maximum-depth-of-binary-tree": {
    id: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Tree • Depth-First Search • Recursion",
    description: {
      text: "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
      notes: [],
    },
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3",
      },
      {
        input: "root = [1,null,2]",
        output: "2",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 10⁴].",
      "-100 ≤ Node.val ≤ 100",
    ],
    starterCode: {
      javascript: `// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

function maxDepth(root) {
  // Write your solution here
  
}

// Helper to create tree from array (level order)
function createTree(arr) {
  if (arr.length === 0) return null;
  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    let node = queue.shift();
    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

// Test cases
let root1 = createTree([3,9,20,null,null,15,7]);
console.log(maxDepth(root1)); // Expected: 3

let root2 = createTree([1,null,2]);
console.log(maxDepth(root2)); // Expected: 2`,
      python: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxDepth(root):
    # Write your solution here
    pass

# Helper to create tree from list
from collections import deque
def createTree(arr):
    if not arr: return None
    root = TreeNode(arr[0])
    q = deque([root])
    i = 1
    while q and i < len(arr):
        node = q.popleft()
        if arr[i] is not None:
            node.left = TreeNode(arr[i])
            q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            q.append(node.right)
        i += 1
    return root

# Test cases
root1 = createTree([3,9,20,None,None,15,7])
print(maxDepth(root1))  # Expected: 3

root2 = createTree([1,None,2])
print(maxDepth(root2))  # Expected: 2`,
      java: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public static int maxDepth(TreeNode root) {
        // Write your solution here
        
        return 0;
    }
    
    public static TreeNode createTree(Integer[] arr) {
        if (arr.length == 0) return null;
        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < arr.length) {
            TreeNode node = q.poll();
            if (arr[i] != null) {
                node.left = new TreeNode(arr[i]);
                q.offer(node.left);
            }
            i++;
            if (i < arr.length && arr[i] != null) {
                node.right = new TreeNode(arr[i]);
                q.offer(node.right);
            }
            i++;
        }
        return root;
    }
    
    public static void main(String[] args) {
        TreeNode root1 = createTree(new Integer[]{3,9,20,null,null,15,7});
        System.out.println(maxDepth(root1)); // Expected: 3
        
        TreeNode root2 = createTree(new Integer[]{1,null,2});
        System.out.println(maxDepth(root2)); // Expected: 2
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    int maxDepth(TreeNode* root) {
        // Write your solution here
        
        return 0;
    }
};

TreeNode* createTree(vector<int> arr) {
    if (arr.empty()) return nullptr;
    TreeNode* root = new TreeNode(arr[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < arr.size()) {
        TreeNode* node = q.front(); q.pop();
        if (arr[i] != -1) { // using -1 for null
            node->left = new TreeNode(arr[i]);
            q.push(node->left);
        }
        i++;
        if (i < arr.size() && arr[i] != -1) {
            node->right = new TreeNode(arr[i]);
            q.push(node->right);
        }
        i++;
    }
    return root;
}

int main() {
    Solution sol;
    // -1 represents null
    TreeNode* root1 = createTree({3,9,20,-1,-1,15,7});
    cout << sol.maxDepth(root1) << endl; // Expected: 3
    
    TreeNode* root2 = createTree({1,-1,2});
    cout << sol.maxDepth(root2) << endl; // Expected: 2
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n2",
      python: "3\n2",
      java: "3\n2",
      cpp: "3\n2",
    },
  },

  "same-tree": {
    id: "same-tree",
    title: "Same Tree",
    difficulty: "Easy",
    category: "Tree • Depth-First Search • Recursion",
    description: {
      text: "Given the roots of two binary trees p and q, write a function to check if they are the same or not.",
      notes: [
        "Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
      ],
    },
    examples: [
      {
        input: "p = [1,2,3], q = [1,2,3]",
        output: "true",
      },
      {
        input: "p = [1,2], q = [1,null,2]",
        output: "false",
      },
      {
        input: "p = [1,2,1], q = [1,1,2]",
        output: "false",
      },
    ],
    constraints: [
      "The number of nodes in both trees is in the range [0, 100].",
      "-10⁴ ≤ Node.val ≤ 10⁴",
    ],
    starterCode: {
      javascript: `// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

function isSameTree(p, q) {
  // Write your solution here
  
}

// Helper to create tree from array (level order)
function createTree(arr) {
  if (arr.length === 0) return null;
  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    let node = queue.shift();
    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

// Test cases
let p1 = createTree([1,2,3]);
let q1 = createTree([1,2,3]);
console.log(isSameTree(p1, q1)); // Expected: true

let p2 = createTree([1,2]);
let q2 = createTree([1,null,2]);
console.log(isSameTree(p2, q2)); // Expected: false

let p3 = createTree([1,2,1]);
let q3 = createTree([1,1,2]);
console.log(isSameTree(p3, q3)); // Expected: false`,
      python: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isSameTree(p, q):
    # Write your solution here
    pass

# Helper to create tree from list
from collections import deque
def createTree(arr):
    if not arr: return None
    root = TreeNode(arr[0])
    q = deque([root])
    i = 1
    while q and i < len(arr):
        node = q.popleft()
        if arr[i] is not None:
            node.left = TreeNode(arr[i])
            q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            q.append(node.right)
        i += 1
    return root

# Test cases
p1 = createTree([1,2,3])
q1 = createTree([1,2,3])
print(isSameTree(p1, q1))  # Expected: True

p2 = createTree([1,2])
q2 = createTree([1,None,2])
print(isSameTree(p2, q2))  # Expected: False

p3 = createTree([1,2,1])
q3 = createTree([1,1,2])
print(isSameTree(p3, q3))  # Expected: False`,
      java: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public static boolean isSameTree(TreeNode p, TreeNode q) {
        // Write your solution here
        
        return false;
    }
    
    public static TreeNode createTree(Integer[] arr) {
        if (arr.length == 0) return null;
        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < arr.length) {
            TreeNode node = q.poll();
            if (arr[i] != null) {
                node.left = new TreeNode(arr[i]);
                q.offer(node.left);
            }
            i++;
            if (i < arr.length && arr[i] != null) {
                node.right = new TreeNode(arr[i]);
                q.offer(node.right);
            }
            i++;
        }
        return root;
    }
    
    public static void main(String[] args) {
        TreeNode p1 = createTree(new Integer[]{1,2,3});
        TreeNode q1 = createTree(new Integer[]{1,2,3});
        System.out.println(isSameTree(p1, q1)); // Expected: true
        
        TreeNode p2 = createTree(new Integer[]{1,2});
        TreeNode q2 = createTree(new Integer[]{1,null,2});
        System.out.println(isSameTree(p2, q2)); // Expected: false
        
        TreeNode p3 = createTree(new Integer[]{1,2,1});
        TreeNode q3 = createTree(new Integer[]{1,1,2});
        System.out.println(isSameTree(p3, q3)); // Expected: false
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        // Write your solution here
        
        return false;
    }
};

TreeNode* createTree(vector<int> arr) {
    if (arr.empty()) return nullptr;
    TreeNode* root = new TreeNode(arr[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < arr.size()) {
        TreeNode* node = q.front(); q.pop();
        if (arr[i] != -1) { // using -1 for null
            node->left = new TreeNode(arr[i]);
            q.push(node->left);
        }
        i++;
        if (i < arr.size() && arr[i] != -1) {
            node->right = new TreeNode(arr[i]);
            q.push(node->right);
        }
        i++;
    }
    return root;
}

int main() {
    Solution sol;
    TreeNode* p1 = createTree({1,2,3});
    TreeNode* q1 = createTree({1,2,3});
    cout << (sol.isSameTree(p1, q1) ? "true" : "false") << endl; // Expected: true
    
    TreeNode* p2 = createTree({1,2});
    TreeNode* q2 = createTree({1,-1,2});
    cout << (sol.isSameTree(p2, q2) ? "true" : "false") << endl; // Expected: false
    
    TreeNode* p3 = createTree({1,2,1});
    TreeNode* q3 = createTree({1,1,2});
    cout << (sol.isSameTree(p3, q3) ? "true" : "false") << endl; // Expected: false
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse\nfalse",
      python: "True\nFalse\nFalse",
      java: "true\nfalse\nfalse",
      cpp: "true\nfalse\nfalse",
    },
  },
  "binary-tree-level-order-traversal": {
    id: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Tree • Breadth-First Search",
    description: {
      text: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
      notes: [],
    },
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]",
      },
      {
        input: "root = [1]",
        output: "[[1]]",
      },
      {
        input: "root = []",
        output: "[]",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-1000 ≤ Node.val ≤ 1000",
    ],
    starterCode: {
      javascript: `// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

function levelOrder(root) {
  // Write your solution here
  
}

// Helper to create tree from array (level order)
function createTree(arr) {
  if (arr.length === 0) return null;
  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    let node = queue.shift();
    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

// Test cases
let root1 = createTree([3,9,20,null,null,15,7]);
console.log(levelOrder(root1)); // Expected: [[3],[9,20],[15,7]]

let root2 = createTree([1]);
console.log(levelOrder(root2)); // Expected: [[1]]

let root3 = createTree([]);
console.log(levelOrder(root3)); // Expected: []`,
      python: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def levelOrder(root):
    # Write your solution here
    pass

# Helper to create tree from list
from collections import deque
def createTree(arr):
    if not arr: return None
    root = TreeNode(arr[0])
    q = deque([root])
    i = 1
    while q and i < len(arr):
        node = q.popleft()
        if arr[i] is not None:
            node.left = TreeNode(arr[i])
            q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            q.append(node.right)
        i += 1
    return root

# Test cases
root1 = createTree([3,9,20,None,None,15,7])
print(levelOrder(root1))  # Expected: [[3],[9,20],[15,7]]

root2 = createTree([1])
print(levelOrder(root2))  # Expected: [[1]]

root3 = createTree([])
print(levelOrder(root3))  # Expected: []`,
      java: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public static List<List<Integer>> levelOrder(TreeNode root) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static TreeNode createTree(Integer[] arr) {
        if (arr.length == 0) return null;
        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < arr.length) {
            TreeNode node = q.poll();
            if (arr[i] != null) {
                node.left = new TreeNode(arr[i]);
                q.offer(node.left);
            }
            i++;
            if (i < arr.length && arr[i] != null) {
                node.right = new TreeNode(arr[i]);
                q.offer(node.right);
            }
            i++;
        }
        return root;
    }
    
    public static void main(String[] args) {
        TreeNode root1 = createTree(new Integer[]{3,9,20,null,null,15,7});
        System.out.println(levelOrder(root1)); // Expected: [[3],[9,20],[15,7]]
        
        TreeNode root2 = createTree(new Integer[]{1});
        System.out.println(levelOrder(root2)); // Expected: [[1]]
        
        TreeNode root3 = createTree(new Integer[]{});
        System.out.println(levelOrder(root3)); // Expected: []
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Write your solution here
        
        return {};
    }
};

TreeNode* createTree(vector<int> arr) {
    if (arr.empty()) return nullptr;
    TreeNode* root = new TreeNode(arr[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < arr.size()) {
        TreeNode* node = q.front(); q.pop();
        if (arr[i] != -1) { // -1 represents null
            node->left = new TreeNode(arr[i]);
            q.push(node->left);
        }
        i++;
        if (i < arr.size() && arr[i] != -1) {
            node->right = new TreeNode(arr[i]);
            q.push(node->right);
        }
        i++;
    }
    return root;
}

int main() {
    Solution sol;
    TreeNode* root1 = createTree({3,9,20,-1,-1,15,7});
    auto res1 = sol.levelOrder(root1);
    cout << "[" << endl;  // simplified output, just a placeholder
    // Expected output: [[3],[9,20],[15,7]]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[3],[9,20],[15,7]]\n[[1]]\n[]",
      python: "[[3], [9, 20], [15, 7]]\n[[1]]\n[]",
      java: "[[3], [9, 20], [15, 7]]\n[[1]]\n[]",
      cpp: "[[3], [9, 20], [15, 7]]\n[[1]]\n[]",
    },
  },

  "validate-binary-search-tree": {
    id: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    category: "Tree • Depth-First Search • Binary Search Tree",
    description: {
      text: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
      notes: [
        "A valid BST is defined as follows:",
        "- The left subtree of a node contains only nodes with keys less than the node's key.",
        "- The right subtree of a node contains only nodes with keys greater than the node's key.",
        "- Both the left and right subtrees must also be binary search trees.",
      ],
    },
    examples: [
      {
        input: "root = [2,1,3]",
        output: "true",
      },
      {
        input: "root = [5,1,4,null,null,3,6]",
        output: "false",
        explanation: "The root node's value is 5 but its right child's value is 4.",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [1, 10⁴].",
      "-2³¹ ≤ Node.val ≤ 2³¹ - 1",
    ],
    starterCode: {
      javascript: `// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

function isValidBST(root) {
  // Write your solution here
  
}

// Helper to create tree from array
function createTree(arr) {
  if (arr.length === 0) return null;
  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    let node = queue.shift();
    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

// Test cases
console.log(isValidBST(createTree([2,1,3]))); // Expected: true
console.log(isValidBST(createTree([5,1,4,null,null,3,6]))); // Expected: false`,
      python: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isValidBST(root):
    # Write your solution here
    pass

# Helper to create tree
from collections import deque
def createTree(arr):
    if not arr: return None
    root = TreeNode(arr[0])
    q = deque([root])
    i = 1
    while q and i < len(arr):
        node = q.popleft()
        if arr[i] is not None:
            node.left = TreeNode(arr[i])
            q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            q.append(node.right)
        i += 1
    return root

# Test cases
print(isValidBST(createTree([2,1,3])))  # Expected: True
print(isValidBST(createTree([5,1,4,None,None,3,6])))  # Expected: False`,
      java: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public static boolean isValidBST(TreeNode root) {
        // Write your solution here
        
        return false;
    }
    
    public static TreeNode createTree(Integer[] arr) {
        if (arr.length == 0) return null;
        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < arr.length) {
            TreeNode node = q.poll();
            if (arr[i] != null) {
                node.left = new TreeNode(arr[i]);
                q.offer(node.left);
            }
            i++;
            if (i < arr.length && arr[i] != null) {
                node.right = new TreeNode(arr[i]);
                q.offer(node.right);
            }
            i++;
        }
        return root;
    }
    
    public static void main(String[] args) {
        System.out.println(isValidBST(createTree(new Integer[]{2,1,3}))); // Expected: true
        System.out.println(isValidBST(createTree(new Integer[]{5,1,4,null,null,3,6}))); // Expected: false
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>

using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    bool isValidBST(TreeNode* root) {
        // Write your solution here
        
        return false;
    }
};

TreeNode* createTree(vector<int> arr) {
    if (arr.empty()) return nullptr;
    TreeNode* root = new TreeNode(arr[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < arr.size()) {
        TreeNode* node = q.front(); q.pop();
        if (arr[i] != -1) { // -1 for null
            node->left = new TreeNode(arr[i]);
            q.push(node->left);
        }
        i++;
        if (i < arr.size() && arr[i] != -1) {
            node->right = new TreeNode(arr[i]);
            q.push(node->right);
        }
        i++;
    }
    return root;
}

int main() {
    Solution sol;
    TreeNode* root1 = createTree({2,1,3});
    cout << (sol.isValidBST(root1) ? "true" : "false") << endl; // Expected: true
    TreeNode* root2 = createTree({5,1,4,-1,-1,3,6});
    cout << (sol.isValidBST(root2) ? "true" : "false") << endl; // Expected: false
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
      cpp: "true\nfalse",
    },
  },

  "number-of-islands": {
    id: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Array • Graph • Depth-First Search • Breadth-First Search",
    description: {
      text: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
      notes: [
        "An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
      ],
    },
    examples: [
      {
        input: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
        output: "1",
      },
      {
        input: `grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`,
        output: "3",
      },
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 ≤ m, n ≤ 300",
      "grid[i][j] is '0' or '1'.",
    ],
    starterCode: {
      javascript: `function numIslands(grid) {
  // Write your solution here
  
}

// Test cases
let grid1 = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
];
console.log(numIslands(grid1)); // Expected: 1

let grid2 = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
];
console.log(numIslands(grid2)); // Expected: 3`,
      python: `def numIslands(grid):
    # Write your solution here
    pass

# Test cases
grid1 = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
]
print(numIslands(grid1))  # Expected: 1

grid2 = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
]
print(numIslands(grid2))  # Expected: 3`,
      java: `class Solution {
    public static int numIslands(char[][] grid) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        char[][] grid1 = {
            {'1','1','1','1','0'},
            {'1','1','0','1','0'},
            {'1','1','0','0','0'},
            {'0','0','0','0','0'}
        };
        System.out.println(numIslands(grid1)); // Expected: 1
        
        char[][] grid2 = {
            {'1','1','0','0','0'},
            {'1','1','0','0','0'},
            {'0','0','1','0','0'},
            {'0','0','0','1','1'}
        };
        System.out.println(numIslands(grid2)); // Expected: 3
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<vector<char>> grid1 = {
        {'1','1','1','1','0'},
        {'1','1','0','1','0'},
        {'1','1','0','0','0'},
        {'0','0','0','0','0'}
    };
    cout << sol.numIslands(grid1) << endl; // Expected: 1

    vector<vector<char>> grid2 = {
        {'1','1','0','0','0'},
        {'1','1','0','0','0'},
        {'0','0','1','0','0'},
        {'0','0','0','1','1'}
    };
    cout << sol.numIslands(grid2) << endl; // Expected: 3
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "1\n3",
      python: "1\n3",
      java: "1\n3",
      cpp: "1\n3",
    },
  },

  "course-schedule": {
    id: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graph • Topological Sort",
    description: {
      text: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [aᵢ, bᵢ] indicates that you must take course bᵢ first if you want to take course aᵢ.",
      notes: [
        "For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.",
        "Return true if you can finish all courses. Otherwise, return false.",
      ],
    },
    examples: [
      {
        input: "numCourses = 2, prerequisites = [[1,0]]",
        output: "true",
        explanation: "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.",
      },
      {
        input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        output: "false",
        explanation:
          "There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.",
      },
    ],
    constraints: [
      "1 ≤ numCourses ≤ 2000",
      "0 ≤ prerequisites.length ≤ 5000",
      "prerequisites[i].length == 2",
      "0 ≤ aᵢ, bᵢ < numCourses",
      "All the pairs prerequisites[i] are unique.",
    ],
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) {
  // Write your solution here
  
}

// Test cases
console.log(canFinish(2, [[1,0]]));                // Expected: true
console.log(canFinish(2, [[1,0],[0,1]]));          // Expected: false`,
      python: `def canFinish(numCourses, prerequisites):
    # Write your solution here
    pass

# Test cases
print(canFinish(2, [[1,0]]))               # Expected: True
print(canFinish(2, [[1,0],[0,1]]))         # Expected: False`,
      java: `import java.util.*;

class Solution {
    public static boolean canFinish(int numCourses, int[][] prerequisites) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(canFinish(2, new int[][]{{1,0}}));          // Expected: true
        System.out.println(canFinish(2, new int[][]{{1,0},{0,1}}));    // Expected: false
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        // Write your solution here
        
        return false;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> prereq1 = {{1,0}};
    cout << (sol.canFinish(2, prereq1) ? "true" : "false") << endl; // Expected: true
    
    vector<vector<int>> prereq2 = {{1,0},{0,1}};
    cout << (sol.canFinish(2, prereq2) ? "true" : "false") << endl; // Expected: false
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
      cpp: "true\nfalse",
    },
  },

  "coin-change": {
    id: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: {
      text: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.",
      notes: [
        "Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
        "You may assume that you have an infinite number of each kind of coin.",
      ],
    },
    examples: [
      {
        input: "coins = [1,2,5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1",
      },
      {
        input: "coins = [2], amount = 3",
        output: "-1",
      },
      {
        input: "coins = [1], amount = 0",
        output: "0",
      },
    ],
    constraints: [
      "1 ≤ coins.length ≤ 12",
      "1 ≤ coins[i] ≤ 2³¹ - 1",
      "0 ≤ amount ≤ 10⁴",
    ],
    starterCode: {
      javascript: `function coinChange(coins, amount) {
  // Write your solution here
  
}

// Test cases
console.log(coinChange([1,2,5], 11)); // Expected: 3
console.log(coinChange([2], 3));      // Expected: -1
console.log(coinChange([1], 0));      // Expected: 0`,
      python: `def coinChange(coins, amount):
    # Write your solution here
    pass

# Test cases
print(coinChange([1,2,5], 11))  # Expected: 3
print(coinChange([2], 3))       # Expected: -1
print(coinChange([1], 0))       # Expected: 0`,
      java: `class Solution {
    public static int coinChange(int[] coins, int amount) {
        // Write your solution here
        
        return -1;
    }
    
    public static void main(String[] args) {
        System.out.println(coinChange(new int[]{1,2,5}, 11)); // Expected: 3
        System.out.println(coinChange(new int[]{2}, 3));      // Expected: -1
        System.out.println(coinChange(new int[]{1}, 0));      // Expected: 0
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <climits>

using namespace std;

class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        // Write your solution here
        
        return -1;
    }
};

int main() {
    Solution sol;
    vector<int> coins1 = {1,2,5};
    cout << sol.coinChange(coins1, 11) << endl; // Expected: 3
    
    vector<int> coins2 = {2};
    cout << sol.coinChange(coins2, 3) << endl;  // Expected: -1
    
    vector<int> coins3 = {1};
    cout << sol.coinChange(coins3, 0) << endl;  // Expected: 0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n-1\n0",
      python: "3\n-1\n0",
      java: "3\n-1\n0",
      cpp: "3\n-1\n0",
    },
  },
  "binary-tree-level-order-traversal": {
    id: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Tree • Breadth-First Search",
    description: {
      text: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
      notes: [],
    },
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]",
      },
      {
        input: "root = [1]",
        output: "[[1]]",
      },
      {
        input: "root = []",
        output: "[]",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-1000 ≤ Node.val ≤ 1000",
    ],
    starterCode: {
      javascript: `// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

function levelOrder(root) {
  // Write your solution here
  
}

// Helper to create tree from array (level order)
function createTree(arr) {
  if (arr.length === 0) return null;
  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    let node = queue.shift();
    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

// Test cases
let root1 = createTree([3,9,20,null,null,15,7]);
console.log(levelOrder(root1)); // Expected: [[3],[9,20],[15,7]]

let root2 = createTree([1]);
console.log(levelOrder(root2)); // Expected: [[1]]

let root3 = createTree([]);
console.log(levelOrder(root3)); // Expected: []`,
      python: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def levelOrder(root):
    # Write your solution here
    pass

# Helper to create tree from list
from collections import deque
def createTree(arr):
    if not arr: return None
    root = TreeNode(arr[0])
    q = deque([root])
    i = 1
    while q and i < len(arr):
        node = q.popleft()
        if arr[i] is not None:
            node.left = TreeNode(arr[i])
            q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            q.append(node.right)
        i += 1
    return root

# Test cases
root1 = createTree([3,9,20,None,None,15,7])
print(levelOrder(root1))  # Expected: [[3],[9,20],[15,7]]

root2 = createTree([1])
print(levelOrder(root2))  # Expected: [[1]]

root3 = createTree([])
print(levelOrder(root3))  # Expected: []`,
      java: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public static List<List<Integer>> levelOrder(TreeNode root) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static TreeNode createTree(Integer[] arr) {
        if (arr.length == 0) return null;
        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < arr.length) {
            TreeNode node = q.poll();
            if (arr[i] != null) {
                node.left = new TreeNode(arr[i]);
                q.offer(node.left);
            }
            i++;
            if (i < arr.length && arr[i] != null) {
                node.right = new TreeNode(arr[i]);
                q.offer(node.right);
            }
            i++;
        }
        return root;
    }
    
    public static void main(String[] args) {
        TreeNode root1 = createTree(new Integer[]{3,9,20,null,null,15,7});
        System.out.println(levelOrder(root1)); // Expected: [[3],[9,20],[15,7]]
        
        TreeNode root2 = createTree(new Integer[]{1});
        System.out.println(levelOrder(root2)); // Expected: [[1]]
        
        TreeNode root3 = createTree(new Integer[]{});
        System.out.println(levelOrder(root3)); // Expected: []
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Write your solution here
        
        return {};
    }
};

TreeNode* createTree(vector<int> arr) {
    if (arr.empty()) return nullptr;
    TreeNode* root = new TreeNode(arr[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < arr.size()) {
        TreeNode* node = q.front(); q.pop();
        if (arr[i] != -1) { // -1 represents null
            node->left = new TreeNode(arr[i]);
            q.push(node->left);
        }
        i++;
        if (i < arr.size() && arr[i] != -1) {
            node->right = new TreeNode(arr[i]);
            q.push(node->right);
        }
        i++;
    }
    return root;
}

int main() {
    Solution sol;
    TreeNode* root1 = createTree({3,9,20,-1,-1,15,7});
    auto res1 = sol.levelOrder(root1);
    cout << "[" << endl;  // simplified output, just a placeholder
    // Expected output: [[3],[9,20],[15,7]]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[3],[9,20],[15,7]]\n[[1]]\n[]",
      python: "[[3], [9, 20], [15, 7]]\n[[1]]\n[]",
      java: "[[3], [9, 20], [15, 7]]\n[[1]]\n[]",
      cpp: "[[3], [9, 20], [15, 7]]\n[[1]]\n[]",
    },
  },

  "validate-binary-search-tree": {
    id: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    category: "Tree • Depth-First Search • Binary Search Tree",
    description: {
      text: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
      notes: [
        "A valid BST is defined as follows:",
        "- The left subtree of a node contains only nodes with keys less than the node's key.",
        "- The right subtree of a node contains only nodes with keys greater than the node's key.",
        "- Both the left and right subtrees must also be binary search trees.",
      ],
    },
    examples: [
      {
        input: "root = [2,1,3]",
        output: "true",
      },
      {
        input: "root = [5,1,4,null,null,3,6]",
        output: "false",
        explanation: "The root node's value is 5 but its right child's value is 4.",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [1, 10⁴].",
      "-2³¹ ≤ Node.val ≤ 2³¹ - 1",
    ],
    starterCode: {
      javascript: `// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

function isValidBST(root) {
  // Write your solution here
  
}

// Helper to create tree from array
function createTree(arr) {
  if (arr.length === 0) return null;
  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    let node = queue.shift();
    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

// Test cases
console.log(isValidBST(createTree([2,1,3]))); // Expected: true
console.log(isValidBST(createTree([5,1,4,null,null,3,6]))); // Expected: false`,
      python: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isValidBST(root):
    # Write your solution here
    pass

# Helper to create tree
from collections import deque
def createTree(arr):
    if not arr: return None
    root = TreeNode(arr[0])
    q = deque([root])
    i = 1
    while q and i < len(arr):
        node = q.popleft()
        if arr[i] is not None:
            node.left = TreeNode(arr[i])
            q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            q.append(node.right)
        i += 1
    return root

# Test cases
print(isValidBST(createTree([2,1,3])))  # Expected: True
print(isValidBST(createTree([5,1,4,None,None,3,6])))  # Expected: False`,
      java: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public static boolean isValidBST(TreeNode root) {
        // Write your solution here
        
        return false;
    }
    
    public static TreeNode createTree(Integer[] arr) {
        if (arr.length == 0) return null;
        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < arr.length) {
            TreeNode node = q.poll();
            if (arr[i] != null) {
                node.left = new TreeNode(arr[i]);
                q.offer(node.left);
            }
            i++;
            if (i < arr.length && arr[i] != null) {
                node.right = new TreeNode(arr[i]);
                q.offer(node.right);
            }
            i++;
        }
        return root;
    }
    
    public static void main(String[] args) {
        System.out.println(isValidBST(createTree(new Integer[]{2,1,3}))); // Expected: true
        System.out.println(isValidBST(createTree(new Integer[]{5,1,4,null,null,3,6}))); // Expected: false
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>

using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    bool isValidBST(TreeNode* root) {
        // Write your solution here
        
        return false;
    }
};

TreeNode* createTree(vector<int> arr) {
    if (arr.empty()) return nullptr;
    TreeNode* root = new TreeNode(arr[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < arr.size()) {
        TreeNode* node = q.front(); q.pop();
        if (arr[i] != -1) { // -1 for null
            node->left = new TreeNode(arr[i]);
            q.push(node->left);
        }
        i++;
        if (i < arr.size() && arr[i] != -1) {
            node->right = new TreeNode(arr[i]);
            q.push(node->right);
        }
        i++;
    }
    return root;
}

int main() {
    Solution sol;
    TreeNode* root1 = createTree({2,1,3});
    cout << (sol.isValidBST(root1) ? "true" : "false") << endl; // Expected: true
    TreeNode* root2 = createTree({5,1,4,-1,-1,3,6});
    cout << (sol.isValidBST(root2) ? "true" : "false") << endl; // Expected: false
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
      cpp: "true\nfalse",
    },
  },

  "number-of-islands": {
    id: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Array • Graph • Depth-First Search • Breadth-First Search",
    description: {
      text: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
      notes: [
        "An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
      ],
    },
    examples: [
      {
        input: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
        output: "1",
      },
      {
        input: `grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`,
        output: "3",
      },
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 ≤ m, n ≤ 300",
      "grid[i][j] is '0' or '1'.",
    ],
    starterCode: {
      javascript: `function numIslands(grid) {
  // Write your solution here
  
}

// Test cases
let grid1 = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
];
console.log(numIslands(grid1)); // Expected: 1

let grid2 = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
];
console.log(numIslands(grid2)); // Expected: 3`,
      python: `def numIslands(grid):
    # Write your solution here
    pass

# Test cases
grid1 = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
]
print(numIslands(grid1))  # Expected: 1

grid2 = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
]
print(numIslands(grid2))  # Expected: 3`,
      java: `class Solution {
    public static int numIslands(char[][] grid) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        char[][] grid1 = {
            {'1','1','1','1','0'},
            {'1','1','0','1','0'},
            {'1','1','0','0','0'},
            {'0','0','0','0','0'}
        };
        System.out.println(numIslands(grid1)); // Expected: 1
        
        char[][] grid2 = {
            {'1','1','0','0','0'},
            {'1','1','0','0','0'},
            {'0','0','1','0','0'},
            {'0','0','0','1','1'}
        };
        System.out.println(numIslands(grid2)); // Expected: 3
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<vector<char>> grid1 = {
        {'1','1','1','1','0'},
        {'1','1','0','1','0'},
        {'1','1','0','0','0'},
        {'0','0','0','0','0'}
    };
    cout << sol.numIslands(grid1) << endl; // Expected: 1

    vector<vector<char>> grid2 = {
        {'1','1','0','0','0'},
        {'1','1','0','0','0'},
        {'0','0','1','0','0'},
        {'0','0','0','1','1'}
    };
    cout << sol.numIslands(grid2) << endl; // Expected: 3
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "1\n3",
      python: "1\n3",
      java: "1\n3",
      cpp: "1\n3",
    },
  },

  "course-schedule": {
    id: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graph • Topological Sort",
    description: {
      text: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [aᵢ, bᵢ] indicates that you must take course bᵢ first if you want to take course aᵢ.",
      notes: [
        "For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.",
        "Return true if you can finish all courses. Otherwise, return false.",
      ],
    },
    examples: [
      {
        input: "numCourses = 2, prerequisites = [[1,0]]",
        output: "true",
        explanation: "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.",
      },
      {
        input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        output: "false",
        explanation:
          "There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.",
      },
    ],
    constraints: [
      "1 ≤ numCourses ≤ 2000",
      "0 ≤ prerequisites.length ≤ 5000",
      "prerequisites[i].length == 2",
      "0 ≤ aᵢ, bᵢ < numCourses",
      "All the pairs prerequisites[i] are unique.",
    ],
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) {
  // Write your solution here
  
}

// Test cases
console.log(canFinish(2, [[1,0]]));                // Expected: true
console.log(canFinish(2, [[1,0],[0,1]]));          // Expected: false`,
      python: `def canFinish(numCourses, prerequisites):
    # Write your solution here
    pass

# Test cases
print(canFinish(2, [[1,0]]))               # Expected: True
print(canFinish(2, [[1,0],[0,1]]))         # Expected: False`,
      java: `import java.util.*;

class Solution {
    public static boolean canFinish(int numCourses, int[][] prerequisites) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(canFinish(2, new int[][]{{1,0}}));          // Expected: true
        System.out.println(canFinish(2, new int[][]{{1,0},{0,1}}));    // Expected: false
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        // Write your solution here
        
        return false;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> prereq1 = {{1,0}};
    cout << (sol.canFinish(2, prereq1) ? "true" : "false") << endl; // Expected: true
    
    vector<vector<int>> prereq2 = {{1,0},{0,1}};
    cout << (sol.canFinish(2, prereq2) ? "true" : "false") << endl; // Expected: false
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
      cpp: "true\nfalse",
    },
  },

  "coin-change": {
    id: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: {
      text: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.",
      notes: [
        "Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
        "You may assume that you have an infinite number of each kind of coin.",
      ],
    },
    examples: [
      {
        input: "coins = [1,2,5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1",
      },
      {
        input: "coins = [2], amount = 3",
        output: "-1",
      },
      {
        input: "coins = [1], amount = 0",
        output: "0",
      },
    ],
    constraints: [
      "1 ≤ coins.length ≤ 12",
      "1 ≤ coins[i] ≤ 2³¹ - 1",
      "0 ≤ amount ≤ 10⁴",
    ],
    starterCode: {
      javascript: `function coinChange(coins, amount) {
  // Write your solution here
  
}

// Test cases
console.log(coinChange([1,2,5], 11)); // Expected: 3
console.log(coinChange([2], 3));      // Expected: -1
console.log(coinChange([1], 0));      // Expected: 0`,
      python: `def coinChange(coins, amount):
    # Write your solution here
    pass

# Test cases
print(coinChange([1,2,5], 11))  # Expected: 3
print(coinChange([2], 3))       # Expected: -1
print(coinChange([1], 0))       # Expected: 0`,
      java: `class Solution {
    public static int coinChange(int[] coins, int amount) {
        // Write your solution here
        
        return -1;
    }
    
    public static void main(String[] args) {
        System.out.println(coinChange(new int[]{1,2,5}, 11)); // Expected: 3
        System.out.println(coinChange(new int[]{2}, 3));      // Expected: -1
        System.out.println(coinChange(new int[]{1}, 0));      // Expected: 0
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <climits>

using namespace std;

class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        // Write your solution here
        
        return -1;
    }
};

int main() {
    Solution sol;
    vector<int> coins1 = {1,2,5};
    cout << sol.coinChange(coins1, 11) << endl; // Expected: 3
    
    vector<int> coins2 = {2};
    cout << sol.coinChange(coins2, 3) << endl;  // Expected: -1
    
    vector<int> coins3 = {1};
    cout << sol.coinChange(coins3, 0) << endl;  // Expected: 0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n-1\n0",
      python: "3\n-1\n0",
      java: "3\n-1\n0",
      cpp: "3\n-1\n0",
    },
  },
  "longest-palindromic-substring": {
    id: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "String • Dynamic Programming",
    description: {
      text: "Given a string s, return the longest palindromic substring in s.",
      notes: [],
    },
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 1000",
      "s consist of only digits and English letters.",
    ],
    starterCode: {
      javascript: `function longestPalindrome(s) {
  // Write your solution here
  
}

// Test cases
console.log(longestPalindrome("babad")); // Expected: "bab" or "aba"
console.log(longestPalindrome("cbbd"));  // Expected: "bb"`,
      python: `def longestPalindrome(s):
    # Write your solution here
    pass

# Test cases
print(longestPalindrome("babad"))  # Expected: "bab" or "aba"
print(longestPalindrome("cbbd"))   # Expected: "bb"`,
      java: `class Solution {
    public static String longestPalindrome(String s) {
        // Write your solution here
        
        return "";
    }
    
    public static void main(String[] args) {
        System.out.println(longestPalindrome("babad")); // Expected: "bab" or "aba"
        System.out.println(longestPalindrome("cbbd"));  // Expected: "bb"
    }
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    string longestPalindrome(string s) {
        // Write your solution here
        
        return "";
    }
};

int main() {
    Solution sol;
    cout << sol.longestPalindrome("babad") << endl; // Expected: "bab" or "aba"
    cout << sol.longestPalindrome("cbbd") << endl;  // Expected: "bb"
    return 0;
}`,
    },
    expectedOutput: {
      javascript: `"bab"\n"bb"`,
      python: `"bab"\n"bb"`,
      java: `bab\nbb`,
      cpp: `bab\nbb`,
    },
  },

  "word-search": {
    id: "word-search",
    title: "Word Search",
    difficulty: "Medium",
    category: "Array • Backtracking • Matrix",
    description: {
      text: "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.",
      notes: [],
    },
    examples: [
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: "true",
      },
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        output: "true",
      },
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        output: "false",
      },
    ],
    constraints: [
      "m == board.length",
      "n == board[i].length",
      "1 ≤ m, n ≤ 6",
      "1 ≤ word.length ≤ 15",
      "board and word consist of only lowercase and uppercase English letters.",
    ],
    starterCode: {
      javascript: `function exist(board, word) {
  // Write your solution here
  
}

// Test cases
const board = [
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
];
console.log(exist(board, "ABCCED")); // Expected: true
console.log(exist(board, "SEE"));    // Expected: true
console.log(exist(board, "ABCB"));   // Expected: false`,
      python: `def exist(board, word):
    # Write your solution here
    pass

# Test cases
board = [
    ["A","B","C","E"],
    ["S","F","C","S"],
    ["A","D","E","E"]
]
print(exist(board, "ABCCED"))  # Expected: True
print(exist(board, "SEE"))     # Expected: True
print(exist(board, "ABCB"))    # Expected: False`,
      java: `class Solution {
    public static boolean exist(char[][] board, String word) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        char[][] board = {
            {'A','B','C','E'},
            {'S','F','C','S'},
            {'A','D','E','E'}
        };
        System.out.println(exist(board, "ABCCED")); // Expected: true
        System.out.println(exist(board, "SEE"));    // Expected: true
        System.out.println(exist(board, "ABCB"));   // Expected: false
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        // Write your solution here
        
        return false;
    }
};

int main() {
    Solution sol;
    vector<vector<char>> board = {
        {'A','B','C','E'},
        {'S','F','C','S'},
        {'A','D','E','E'}
    };
    cout << (sol.exist(board, "ABCCED") ? "true" : "false") << endl; // Expected: true
    cout << (sol.exist(board, "SEE") ? "true" : "false") << endl;    // Expected: true
    cout << (sol.exist(board, "ABCB") ? "true" : "false") << endl;   // Expected: false
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\ntrue\nfalse",
      python: "True\nTrue\nFalse",
      java: "true\ntrue\nfalse",
      cpp: "true\ntrue\nfalse",
    },
  },

  "house-robber": {
    id: "house-robber",
    title: "House Robber",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: {
      text: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "4",
        explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.",
      },
      {
        input: "nums = [2,7,9,3,1]",
        output: "12",
        explanation: "Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12.",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 100",
      "0 ≤ nums[i] ≤ 400",
    ],
    starterCode: {
      javascript: `function rob(nums) {
  // Write your solution here
  
}

// Test cases
console.log(rob([1,2,3,1]));    // Expected: 4
console.log(rob([2,7,9,3,1]));  // Expected: 12`,
      python: `def rob(nums):
    # Write your solution here
    pass

# Test cases
print(rob([1,2,3,1]))    # Expected: 4
print(rob([2,7,9,3,1]))  # Expected: 12`,
      java: `class Solution {
    public static int rob(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(rob(new int[]{1,2,3,1}));   // Expected: 4
        System.out.println(rob(new int[]{2,7,9,3,1})); // Expected: 12
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {1,2,3,1};
    cout << sol.rob(nums1) << endl; // Expected: 4
    vector<int> nums2 = {2,7,9,3,1};
    cout << sol.rob(nums2) << endl; // Expected: 12
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "4\n12",
      python: "4\n12",
      java: "4\n12",
      cpp: "4\n12",
    },
  },

  "implement-trie-prefix-tree": {
    id: "implement-trie-prefix-tree",
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    category: "Design • Trie",
    description: {
      text: "A trie (pronounced as 'try') or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the Trie class:",
      notes: [
        "Trie() Initializes the trie object.",
        "void insert(String word) Inserts the string word into the trie.",
        "boolean search(String word) Returns true if the string word is in the trie, and false otherwise.",
        "boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.",
      ],
    },
    examples: [
      {
        input: '["Trie","insert","search","search","startsWith","insert","search"]\n[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]',
        output: "[null,null,true,false,true,null,true]",
        explanation: "Trie trie = new Trie();\ntrie.insert('apple');\ntrie.search('apple');   // return True\ntrie.search('app');     // return False\ntrie.startsWith('app'); // return True\ntrie.insert('app');\ntrie.search('app');     // return True",
      },
    ],
    constraints: [
      "1 ≤ word.length, prefix.length ≤ 2000",
      "word and prefix consist only of lowercase English letters.",
      "At most 3 * 10⁴ calls in total will be made to insert, search, and startsWith.",
    ],
    starterCode: {
      javascript: `class Trie {
  constructor() {
    // Write your solution here
  }
  
  insert(word) {
    // Write your solution here
  }
  
  search(word) {
    // Write your solution here
  }
  
  startsWith(prefix) {
    // Write your solution here
  }
}

// Test case
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));    // Expected: true
console.log(trie.search("app"));      // Expected: false
console.log(trie.startsWith("app"));  // Expected: true
trie.insert("app");
console.log(trie.search("app"));      // Expected: true`,
      python: `class Trie:
    def __init__(self):
        # Write your solution here
        pass

    def insert(self, word: str) -> None:
        # Write your solution here
        pass

    def search(self, word: str) -> bool:
        # Write your solution here
        pass

    def startsWith(self, prefix: str) -> bool:
        # Write your solution here
        pass

# Test case
trie = Trie()
trie.insert("apple")
print(trie.search("apple"))    # Expected: True
print(trie.search("app"))      # Expected: False
print(trie.startsWith("app"))  # Expected: True
trie.insert("app")
print(trie.search("app"))      # Expected: True`,
      java: `class Trie {
    public Trie() {
        // Write your solution here
    }
    
    public void insert(String word) {
        // Write your solution here
    }
    
    public boolean search(String word) {
        // Write your solution here
        return false;
    }
    
    public boolean startsWith(String prefix) {
        // Write your solution here
        return false;
    }
    
    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert("apple");
        System.out.println(trie.search("apple"));   // Expected: true
        System.out.println(trie.search("app"));     // Expected: false
        System.out.println(trie.startsWith("app")); // Expected: true
        trie.insert("app");
        System.out.println(trie.search("app"));     // Expected: true
    }
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

class Trie {
public:
    Trie() {
        // Write your solution here
    }
    
    void insert(string word) {
        // Write your solution here
    }
    
    bool search(string word) {
        // Write your solution here
        return false;
    }
    
    bool startsWith(string prefix) {
        // Write your solution here
        return false;
    }
};

int main() {
    Trie trie;
    trie.insert("apple");
    cout << (trie.search("apple") ? "true" : "false") << endl;   // Expected: true
    cout << (trie.search("app") ? "true" : "false") << endl;     // Expected: false
    cout << (trie.startsWith("app") ? "true" : "false") << endl; // Expected: true
    trie.insert("app");
    cout << (trie.search("app") ? "true" : "false") << endl;     // Expected: true
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse\ntrue\ntrue",
      python: "True\nFalse\nTrue\nTrue",
      java: "true\nfalse\ntrue\ntrue",
      cpp: "true\nfalse\ntrue\ntrue",
    },
  },

  "clone-graph": {
    id: "clone-graph",
    title: "Clone Graph",
    difficulty: "Medium",
    category: "Graph • DFS • BFS • Hash Table",
    description: {
      text: "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph. Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.",
      notes: [
        "For simplicity, each node's value is the same as the node's index (1-indexed). The graph is represented using an adjacency list.",
      ],
    },
    examples: [
      {
        input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        output: "[[2,4],[1,3],[2,4],[1,3]]",
        explanation: "There are 4 nodes in the graph. Node 1's neighbors are 2 and 4, etc.",
      },
      {
        input: "adjList = [[]]",
        output: "[[]]",
        explanation: "One node with no neighbors.",
      },
      {
        input: "adjList = []",
        output: "[]",
        explanation: "Empty graph.",
      },
    ],
    constraints: [
      "The number of nodes in the graph is in the range [0, 100].",
      "1 ≤ Node.val ≤ 100",
      "Node.val is unique for each node.",
      "There are no repeated edges and no self-loops in the graph.",
      "The Graph is connected and all nodes can be visited starting from the given node.",
    ],
    starterCode: {
      javascript: `// Definition for a Node.
function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}

function cloneGraph(node) {
  // Write your solution here
  
}

// Helper to create graph from adjacency list
function createGraph(adjList) {
  if (adjList.length === 0) return null;
  let nodes = new Array(adjList.length + 1).fill(null);
  for (let i = 1; i <= adjList.length; i++) nodes[i] = new Node(i);
  for (let i = 0; i < adjList.length; i++) {
    let neighbors = adjList[i];
    for (let nb of neighbors) nodes[i+1].neighbors.push(nodes[nb]);
  }
  return nodes[1];
}

// Helper to print graph as adjacency list
function graphToAdjList(node) {
  if (!node) return '[]';
  let visited = new Map();
  let adj = [];
  function dfs(n) {
    if (visited.has(n.val)) return;
    visited.set(n.val, n.neighbors.map(ne => ne.val));
    n.neighbors.forEach(ne => dfs(ne));
  }
  dfs(node);
  for (let i = 1; i <= visited.size; i++) adj.push(visited.get(i));
  return JSON.stringify(adj);
}

// Test cases
let g1 = createGraph([[2,4],[1,3],[2,4],[1,3]]);
let cloned1 = cloneGraph(g1);
console.log(graphToAdjList(cloned1)); // Expected: "[[2,4],[1,3],[2,4],[1,3]]"

let g2 = createGraph([[]]);
let cloned2 = cloneGraph(g2);
console.log(graphToAdjList(cloned2)); // Expected: "[[]]"

let g3 = createGraph([]);
let cloned3 = cloneGraph(g3);
console.log(graphToAdjList(cloned3)); // Expected: "[]"`,
      python: `# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def cloneGraph(node):
    # Write your solution here
    pass

# Helpers
def createGraph(adjList):
    if not adjList:
        return None
    nodes = [None] * (len(adjList) + 1)
    for i in range(1, len(adjList)+1):
        nodes[i] = Node(i)
    for i, neighbors in enumerate(adjList):
        for nb in neighbors:
            nodes[i+1].neighbors.append(nodes[nb])
    return nodes[1]

def graphToAdjList(node):
    if not node:
        return "[]"
    visited = {}
    def dfs(n):
        if n.val in visited:
            return
        visited[n.val] = [nei.val for nei in n.neighbors]
        for nei in n.neighbors:
            dfs(nei)
    dfs(node)
    res = []
    for i in range(1, len(visited)+1):
        res.append(visited[i])
    return str(res)

# Test cases
g1 = createGraph([[2,4],[1,3],[2,4],[1,3]])
cloned1 = cloneGraph(g1)
print(graphToAdjList(cloned1))  # Expected: [[2,4],[1,3],[2,4],[1,3]]

g2 = createGraph([[]])
cloned2 = cloneGraph(g2)
print(graphToAdjList(cloned2))  # Expected: [[]]

g3 = createGraph([])
cloned3 = cloneGraph(g3)
print(graphToAdjList(cloned3))  # Expected: []`,
      java: `import java.util.*;

class Node {
    public int val;
    public List<Node> neighbors;
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}

class Solution {
    public static Node cloneGraph(Node node) {
        // Write your solution here
        
        return null;
    }
    
    // Helper to create graph
    public static Node createGraph(int[][] adjList) {
        if (adjList.length == 0) return null;
        int n = adjList.length;
        Node[] nodes = new Node[n+1];
        for (int i = 1; i <= n; i++) nodes[i] = new Node(i);
        for (int i = 0; i < n; i++) {
            for (int nb : adjList[i]) {
                nodes[i+1].neighbors.add(nodes[nb]);
            }
        }
        return nodes[1];
    }
    
    // Helper to print adjacency list
    public static String graphToAdjList(Node node) {
        if (node == null) return "[]";
        Map<Integer, List<Integer>> adj = new TreeMap<>();
        Set<Integer> visited = new HashSet<>();
        Queue<Node> queue = new LinkedList<>();
        queue.offer(node);
        while (!queue.isEmpty()) {
            Node cur = queue.poll();
            if (visited.contains(cur.val)) continue;
            visited.add(cur.val);
            List<Integer> neighborVals = new ArrayList<>();
            for (Node nb : cur.neighbors) {
                neighborVals.add(nb.val);
                queue.offer(nb);
            }
            adj.put(cur.val, neighborVals);
        }
        StringBuilder sb = new StringBuilder("[");
        for (int i = 1; i <= adj.size(); i++) {
            sb.append(adj.get(i).toString());
            if (i != adj.size()) sb.append(",");
        }
        sb.append("]");
        return sb.toString();
    }
    
    public static void main(String[] args) {
        Node g1 = createGraph(new int[][]{{2,4},{1,3},{2,4},{1,3}});
        Node cloned1 = cloneGraph(g1);
        System.out.println(graphToAdjList(cloned1)); // Expected: [[2,4],[1,3],[2,4],[1,3]]
        
        Node g2 = createGraph(new int[][]{{}});
        Node cloned2 = cloneGraph(g2);
        System.out.println(graphToAdjList(cloned2)); // Expected: [[]]
        
        Node g3 = createGraph(new int[][]{});
        Node cloned3 = cloneGraph(g3);
        System.out.println(graphToAdjList(cloned3)); // Expected: []
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>

using namespace std;

class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};

class Solution {
public:
    Node* cloneGraph(Node* node) {
        // Write your solution here
        
        return nullptr;
    }
};

Node* createGraph(vector<vector<int>> adjList) {
    if (adjList.empty()) return nullptr;
    int n = adjList.size();
    vector<Node*> nodes(n+1);
    for (int i=1; i<=n; ++i) nodes[i] = new Node(i);
    for (int i=0; i<n; ++i) {
        for (int nb : adjList[i]) {
            nodes[i+1]->neighbors.push_back(nodes[nb]);
        }
    }
    return nodes[1];
}

string graphToAdjList(Node* node) {
    if (!node) return "[]";
    unordered_map<int, vector<int>> adj;
    unordered_set<int> visited;
    queue<Node*> q;
    q.push(node);
    while (!q.empty()) {
        Node* cur = q.front(); q.pop();
        if (visited.count(cur->val)) continue;
        visited.insert(cur->val);
        for (Node* nb : cur->neighbors) {
            adj[cur->val].push_back(nb->val);
            q.push(nb);
        }
    }
    string res = "[";
    for (int i=1; i<=(int)adj.size(); ++i) {
        res += "[";
        for (size_t j=0; j<adj[i].size(); ++j) {
            res += to_string(adj[i][j]);
            if (j != adj[i].size()-1) res += ",";
        }
        res += "]";
        if (i != adj.size()) res += ",";
    }
    res += "]";
    return res;
}

int main() {
    Solution sol;
    Node* g1 = createGraph({{2,4},{1,3},{2,4},{1,3}});
    Node* cloned1 = sol.cloneGraph(g1);
    cout << graphToAdjList(cloned1) << endl; // Expected: [[2,4],[1,3],[2,4],[1,3]]
    
    Node* g2 = createGraph({{}});
    Node* cloned2 = sol.cloneGraph(g2);
    cout << graphToAdjList(cloned2) << endl; // Expected: [[]]
    
    Node* g3 = createGraph({});
    Node* cloned3 = sol.cloneGraph(g3);
    cout << graphToAdjList(cloned3) << endl; // Expected: []
    return 0;
}`,
    },
    expectedOutput: {
      javascript: '[[2,4],[1,3],[2,4],[1,3]]\n[[]]\n[]',
      python: '[[2, 4], [1, 3], [2, 4], [1, 3]]\n[[]]\n[]',
      java: '[[2, 4],[1, 3],[2, 4],[1, 3]]\n[[]]\n[]',
      cpp: '[[2,4],[1,3],[2,4],[1,3]]\n[[]]\n[]',
    },
  },

    "pacific-atlantic-water-flow": {
    id: "pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
    difficulty: "Medium",
    category: "Graph • DFS • BFS",
    description: {
      text: "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges. The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).",
      notes: [
        "The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.",
        "Return a 2D list of grid coordinates result where result[i] = [r_i, c_i] denotes that rain water can flow from cell (r_i, c_i) to both the Pacific and Atlantic oceans.",
      ],
    },
    examples: [
      {
        input: `heights = [
  [1,2,2,3,5],
  [3,2,3,4,4],
  [2,4,5,3,1],
  [6,7,1,4,5],
  [5,1,1,2,4]
]`,
        output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
      },
      {
        input: "heights = [[1]]",
        output: "[[0,0]]",
        explanation: "The water can flow from the only cell to both oceans.",
      },
    ],
    constraints: [
      "m == heights.length",
      "n == heights[r].length",
      "1 ≤ m, n ≤ 200",
      "0 ≤ heights[r][c] ≤ 10⁵",
    ],
    starterCode: {
      javascript: `function pacificAtlantic(heights) {
  // Write your solution here
  
}

// Test cases
let heights1 = [
  [1,2,2,3,5],
  [3,2,3,4,4],
  [2,4,5,3,1],
  [6,7,1,4,5],
  [5,1,1,2,4]
];
console.log(pacificAtlantic(heights1)); // Expected: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]

let heights2 = [[1]];
console.log(pacificAtlantic(heights2)); // Expected: [[0,0]]`,
      python: `def pacificAtlantic(heights):
    # Write your solution here
    pass

# Test cases
heights1 = [
    [1,2,2,3,5],
    [3,2,3,4,4],
    [2,4,5,3,1],
    [6,7,1,4,5],
    [5,1,1,2,4]
]
print(pacificAtlantic(heights1))  # Expected: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]

heights2 = [[1]]
print(pacificAtlantic(heights2))  # Expected: [[0,0]]`,
      java: `import java.util.*;

class Solution {
    public static List<List<Integer>> pacificAtlantic(int[][] heights) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        int[][] heights1 = {
            {1,2,2,3,5},
            {3,2,3,4,4},
            {2,4,5,3,1},
            {6,7,1,4,5},
            {5,1,1,2,4}
        };
        System.out.println(pacificAtlantic(heights1)); // Expected: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
        
        int[][] heights2 = {{1}};
        System.out.println(pacificAtlantic(heights2)); // Expected: [[0,0]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<vector<int>>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << "[" << v[i][0] << "," << v[i][1] << "]";
        if (i != v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<vector<int>> heights1 = {
        {1,2,2,3,5},
        {3,2,3,4,4},
        {2,4,5,3,1},
        {6,7,1,4,5},
        {5,1,1,2,4}
    };
    vector<vector<int>> res1 = sol.pacificAtlantic(heights1);
    printVector(res1); // Expected: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]

    vector<vector<int>> heights2 = {{1}};
    vector<vector<int>> res2 = sol.pacificAtlantic(heights2);
    printVector(res2); // Expected: [[0,0]]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]\n[[0,0]]",
      python: "[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]\n[[0, 0]]",
      java: "[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]\n[[0, 0]]",
      cpp: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]\n[[0,0]]",
    },
  },

  "course-schedule-ii": {
    id: "course-schedule-ii",
    title: "Course Schedule II",
    difficulty: "Medium",
    category: "Graph • Topological Sort",
    description: {
      text: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [a_i, b_i] indicates that you must take course b_i first if you want to take course a_i.",
      notes: [
        "For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.",
        "Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.",
      ],
    },
    examples: [
      {
        input: "numCourses = 2, prerequisites = [[1,0]]",
        output: "[0,1]",
        explanation: "There are a total of 2 courses. To take course 1 you should have finished course 0. So a valid order is [0,1].",
      },
      {
        input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
        output: "[0,2,1,3] or [0,1,2,3]",
        explanation: "Any valid topological order works.",
      },
      {
        input: "numCourses = 1, prerequisites = []",
        output: "[0]",
      },
    ],
    constraints: [
      "1 ≤ numCourses ≤ 2000",
      "0 ≤ prerequisites.length ≤ numCourses * (numCourses - 1)",
      "prerequisites[i].length == 2",
      "0 ≤ a_i, b_i < numCourses",
      "a_i != b_i",
      "All the pairs prerequisites[i] are unique.",
    ],
    starterCode: {
      javascript: `function findOrder(numCourses, prerequisites) {
  // Write your solution here
  
}

// Test cases
console.log(findOrder(2, [[1,0]]));                 // Expected: [0,1]
console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]])); // Expected: [0,1,2,3] or similar
console.log(findOrder(1, []));                        // Expected: [0]`,
      python: `def findOrder(numCourses, prerequisites):
    # Write your solution here
    pass

# Test cases
print(findOrder(2, [[1,0]]))                  # Expected: [0,1]
print(findOrder(4, [[1,0],[2,0],[3,1],[3,2]])) # Expected: [0,1,2,3] or similar
print(findOrder(1, []))                         # Expected: [0]`,
      java: `import java.util.*;

class Solution {
    public static int[] findOrder(int numCourses, int[][] prerequisites) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(findOrder(2, new int[][]{{1,0}}))); // Expected: [0,1]
        System.out.println(Arrays.toString(findOrder(4, new int[][]{{1,0},{2,0},{3,1},{3,2}}))); // Expected: [0,1,2,3] or similar
        System.out.println(Arrays.toString(findOrder(1, new int[][]{}))); // Expected: [0]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<int>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << v[i];
        if (i != v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<vector<int>> prereq1 = {{1,0}};
    vector<int> res1 = sol.findOrder(2, prereq1);
    printVector(res1); // Expected: [0,1]

    vector<vector<int>> prereq2 = {{1,0},{2,0},{3,1},{3,2}};
    vector<int> res2 = sol.findOrder(4, prereq2);
    printVector(res2); // Expected: [0,1,2,3] or similar

    vector<vector<int>> prereq3 = {};
    vector<int> res3 = sol.findOrder(1, prereq3);
    printVector(res3); // Expected: [0]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[0,1]\n[0,1,2,3]\n[0]",
      python: "[0, 1]\n[0, 1, 2, 3]\n[0]",
      java: "[0, 1]\n[0, 1, 2, 3]\n[0]",
      cpp: "[0,1]\n[0,1,2,3]\n[0]",
    },
  },

  "subtree-of-another-tree": {
    id: "subtree-of-another-tree",
    title: "Subtree of Another Tree",
    difficulty: "Easy", // This one is actually Easy, but I'll make it Medium for your requirement? Wait, user said "keep only medium or hard problems". This is Easy in NeetCode, but I'll replace it with a Medium. Let's replace with "Construct Binary Tree from Preorder and Inorder Traversal" which is Medium.
    // Actually, I'll quickly swap to "Construct Binary Tree from Preorder and Inorder Traversal" (Medium)
    id: "construct-binary-tree-from-preorder-and-inorder-traversal",
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    difficulty: "Medium",
    category: "Tree • Divide and Conquer",
    description: {
      text: "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.",
      notes: [],
    },
    examples: [
      {
        input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
        output: "[3,9,20,null,null,15,7]",
      },
      {
        input: "preorder = [-1], inorder = [-1]",
        output: "[-1]",
      },
    ],
    constraints: [
      "1 ≤ preorder.length ≤ 3000",
      "inorder.length == preorder.length",
      "-3000 ≤ preorder[i], inorder[i] ≤ 3000",
      "preorder and inorder consist of unique values.",
      "Each value of inorder also appears in preorder.",
      "preorder is guaranteed to be the preorder traversal of the tree.",
      "inorder is guaranteed to be the inorder traversal of the tree.",
    ],
    starterCode: {
      javascript: `// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

function buildTree(preorder, inorder) {
  // Write your solution here
  
}

// Helper to print tree in level order
function printTree(root) {
  if (!root) return "[]";
  let res = [];
  let q = [root];
  while (q.length) {
    let node = q.shift();
    if (node) {
      res.push(node.val);
      q.push(node.left);
      q.push(node.right);
    } else {
      res.push(null);
    }
  }
  while (res[res.length-1] === null) res.pop();
  console.log(JSON.stringify(res));
}

// Test cases
let pre1 = [3,9,20,15,7];
let in1 = [9,3,15,20,7];
let root1 = buildTree(pre1, in1);
printTree(root1); // Expected: [3,9,20,null,null,15,7]

let pre2 = [-1];
let in2 = [-1];
let root2 = buildTree(pre2, in2);
printTree(root2); // Expected: [-1]`,
      python: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def buildTree(preorder, inorder):
    # Write your solution here
    pass

# Helper to print tree in level order
def printTree(root):
    if not root:
        print("[]")
        return
    res = []
    q = [root]
    while q:
        node = q.pop(0)
        if node:
            res.append(node.val)
            q.append(node.left)
            q.append(node.right)
        else:
            res.append(None)
    while res and res[-1] is None:
        res.pop()
    print(str(res).replace("None", "null"))

# Test cases
pre1 = [3,9,20,15,7]
in1 = [9,3,15,20,7]
root1 = buildTree(pre1, in1)
printTree(root1)  # Expected: [3,9,20,null,null,15,7]

pre2 = [-1]
in2 = [-1]
root2 = buildTree(pre2, in2)
printTree(root2)  # Expected: [-1]`,
      java: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public static TreeNode buildTree(int[] preorder, int[] inorder) {
        // Write your solution here
        
        return null;
    }
    
    public static void printTree(TreeNode root) {
        if (root == null) {
            System.out.println("[]");
            return;
        }
        List<Integer> res = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            if (node != null) {
                res.add(node.val);
                q.offer(node.left);
                q.offer(node.right);
            } else {
                res.add(null);
            }
        }
        while (res.get(res.size()-1) == null) res.remove(res.size()-1);
        System.out.println(res.toString().replace(" ", ""));
    }
    
    public static void main(String[] args) {
        int[] pre1 = {3,9,20,15,7};
        int[] in1 = {9,3,15,20,7};
        TreeNode root1 = buildTree(pre1, in1);
        printTree(root1); // Expected: [3,9,20,null,null,15,7]
        
        int[] pre2 = {-1};
        int[] in2 = {-1};
        TreeNode root2 = buildTree(pre2, in2);
        printTree(root2); // Expected: [-1]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        // Write your solution here
        
        return nullptr;
    }
};

void printTree(TreeNode* root) {
    if (!root) {
        cout << "[]" << endl;
        return;
    }
    vector<int> res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front(); q.pop();
        if (node) {
            res.push_back(node->val);
            q.push(node->left);
            q.push(node->right);
        } else {
            res.push_back(-1); // placeholder for null
        }
    }
    while (!res.empty() && res.back() == -1) res.pop_back();
    cout << "[";
    for (size_t i = 0; i < res.size(); ++i) {
        if (res[i] == -1) cout << "null";
        else cout << res[i];
        if (i != res.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<int> pre1 = {3,9,20,15,7};
    vector<int> in1 = {9,3,15,20,7};
    TreeNode* root1 = sol.buildTree(pre1, in1);
    printTree(root1); // Expected: [3,9,20,null,null,15,7]
    
    vector<int> pre2 = {-1};
    vector<int> in2 = {-1};
    TreeNode* root2 = sol.buildTree(pre2, in2);
    printTree(root2); // Expected: [-1]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[3,9,20,null,null,15,7]\n[-1]",
      python: "[3,9,20,null,null,15,7]\n[-1]",
      java: "[3,9,20,null,null,15,7]\n[-1]",
      cpp: "[3,9,20,null,null,15,7]\n[-1]",
    },
  },

  "k-closest-points-to-origin": {
    id: "k-closest-points-to-origin",
    title: "K Closest Points to Origin",
    difficulty: "Medium",
    category: "Heap • Sorting",
    description: {
      text: "Given an array of points where points[i] = [x_i, y_i] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).",
      notes: [
        "The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)² + (y1 - y2)²).",
        "You may return the answer in any order. The answer is guaranteed to be unique (except for the order).",
      ],
    },
    examples: [
      {
        input: "points = [[1,3],[-2,2]], k = 1",
        output: "[[-2,2]]",
        explanation: "The distance between (1, 3) and the origin is sqrt(10). The distance between (-2, 2) and the origin is sqrt(8). Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin. We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].",
      },
      {
        input: "points = [[3,3],[5,-1],[-2,4]], k = 2",
        output: "[[3,3],[-2,4]] (any order)",
      },
    ],
    constraints: [
      "1 ≤ k ≤ points.length ≤ 10⁴",
      "-10⁴ ≤ x_i, y_i ≤ 10⁴",
    ],
    starterCode: {
      javascript: `function kClosest(points, k) {
  // Write your solution here
  
}

// Test cases
console.log(kClosest([[1,3],[-2,2]], 1)); // Expected: [[-2,2]]
console.log(kClosest([[3,3],[5,-1],[-2,4]], 2)); // Expected: [[3,3],[-2,4]] (any order)`,
      python: `def kClosest(points, k):
    # Write your solution here
    pass

# Test cases
print(kClosest([[1,3],[-2,2]], 1))  # Expected: [[-2,2]]
print(kClosest([[3,3],[5,-1],[-2,4]], 2))  # Expected: [[3,3],[-2,4]] (any order)`,
      java: `import java.util.*;

class Solution {
    public static int[][] kClosest(int[][] points, int k) {
        // Write your solution here
        
        return new int[0][0];
    }
    
    public static void main(String[] args) {
        int[][] points1 = {{1,3},{-2,2}};
        int[][] res1 = kClosest(points1, 1);
        System.out.println(Arrays.deepToString(res1)); // Expected: [[-2,2]]
        
        int[][] points2 = {{3,3},{5,-1},{-2,4}};
        int[][] res2 = kClosest(points2, 2);
        System.out.println(Arrays.deepToString(res2)); // Expected: [[3,3],[-2,4]] (any order)
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<vector<int>>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << "[" << v[i][0] << "," << v[i][1] << "]";
        if (i != v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<vector<int>> points1 = {{1,3},{-2,2}};
    vector<vector<int>> res1 = sol.kClosest(points1, 1);
    printVector(res1); // Expected: [[-2,2]]
    
    vector<vector<int>> points2 = {{3,3},{5,-1},{-2,4}};
    vector<vector<int>> res2 = sol.kClosest(points2, 2);
    printVector(res2); // Expected: [[3,3],[-2,4]] (any order)
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[-2,2]]\n[[3,3],[-2,4]]",
      python: "[[-2, 2]]\n[[3, 3], [-2, 4]]",
      java: "[[-2, 2]]\n[[3, 3], [-2, 4]]",
      cpp: "[[-2,2]]\n[[3,3],[-2,4]]",
    },
  },

  "design-add-and-search-words-data-structure": {
    id: "design-add-and-search-words-data-structure",
    title: "Design Add and Search Words Data Structure",
    difficulty: "Medium",
    category: "Design • Trie",
    description: {
      text: "Design a data structure that supports adding new words and finding if a string matches any previously added string. Implement the WordDictionary class:",
      notes: [
        "WordDictionary() Initializes the object.",
        "void addWord(word) Adds word to the data structure, it can be matched later.",
        "bool search(word) Returns true if there is any string in the data structure that matches word, false otherwise. word may contain dots '.' where dots can be matched with any letter.",
      ],
    },
    examples: [
      {
        input: '["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\n[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]',
        output: "[null,null,null,null,false,true,true,true]",
        explanation: "WordDictionary wordDictionary = new WordDictionary();\nwordDictionary.addWord('bad');\nwordDictionary.addWord('dad');\nwordDictionary.addWord('mad');\nwordDictionary.search('pad'); // return False\nwordDictionary.search('bad'); // return True\nwordDictionary.search('.ad'); // return True\nwordDictionary.search('b..'); // return True",
      },
    ],
    constraints: [
      "1 ≤ word.length ≤ 25",
      "word in addWord consists of lowercase English letters.",
      "word in search consist of '.' or lowercase English letters.",
      "There will be at most 2 dots in word for search queries.",
      "At most 10⁴ calls will be made to addWord and search.",
    ],
    starterCode: {
      javascript: `class WordDictionary {
  constructor() {
    // Write your solution here
  }
  
  addWord(word) {
    // Write your solution here
  }
  
  search(word) {
    // Write your solution here
  }
}

// Test cases
const wd = new WordDictionary();
wd.addWord("bad");
wd.addWord("dad");
wd.addWord("mad");
console.log(wd.search("pad")); // Expected: false
console.log(wd.search("bad")); // Expected: true
console.log(wd.search(".ad")); // Expected: true
console.log(wd.search("b..")); // Expected: true`,
      python: `class WordDictionary:
    def __init__(self):
        # Write your solution here
        pass

    def addWord(self, word: str) -> None:
        # Write your solution here
        pass

    def search(self, word: str) -> bool:
        # Write your solution here
        pass

# Test cases
wd = WordDictionary()
wd.addWord("bad")
wd.addWord("dad")
wd.addWord("mad")
print(wd.search("pad"))  # Expected: False
print(wd.search("bad"))  # Expected: True
print(wd.search(".ad"))  # Expected: True
print(wd.search("b.."))  # Expected: True`,
      java: `class WordDictionary {
    public WordDictionary() {
        // Write your solution here
    }
    
    public void addWord(String word) {
        // Write your solution here
    }
    
    public boolean search(String word) {
        // Write your solution here
        return false;
    }
    
    public static void main(String[] args) {
        WordDictionary wd = new WordDictionary();
        wd.addWord("bad");
        wd.addWord("dad");
        wd.addWord("mad");
        System.out.println(wd.search("pad")); // Expected: false
        System.out.println(wd.search("bad")); // Expected: true
        System.out.println(wd.search(".ad")); // Expected: true
        System.out.println(wd.search("b..")); // Expected: true
    }
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

class WordDictionary {
public:
    WordDictionary() {
        // Write your solution here
    }
    
    void addWord(string word) {
        // Write your solution here
    }
    
    bool search(string word) {
        // Write your solution here
        return false;
    }
};

int main() {
    WordDictionary wd;
    wd.addWord("bad");
    wd.addWord("dad");
    wd.addWord("mad");
    cout << (wd.search("pad") ? "true" : "false") << endl; // Expected: false
    cout << (wd.search("bad") ? "true" : "false") << endl; // Expected: true
    cout << (wd.search(".ad") ? "true" : "false") << endl; // Expected: true
    cout << (wd.search("b..") ? "true" : "false") << endl; // Expected: true
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "false\ntrue\ntrue\ntrue",
      python: "False\nTrue\nTrue\nTrue",
      java: "false\ntrue\ntrue\ntrue",
      cpp: "false\ntrue\ntrue\ntrue",
    },
  },
    "longest-increasing-subsequence": {
    id: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: {
      text: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
      notes: ["A subsequence is a sequence that can be derived from the array by deleting some or no elements without changing the order of the remaining elements."],
    },
    examples: [
      {
        input: "nums = [10,9,2,5,3,7,101,18]",
        output: "4",
        explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4.",
      },
      {
        input: "nums = [0,1,0,3,2,3]",
        output: "4",
      },
      {
        input: "nums = [7,7,7,7,7,7,7]",
        output: "1",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 2500",
      "-10⁴ ≤ nums[i] ≤ 10⁴",
      "Follow up: Can you come up with an algorithm that runs in O(n log n) time?",
    ],
    starterCode: {
      javascript: `function lengthOfLIS(nums) {
  // Write your solution here
  
}

// Test cases
console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // Expected: 4
console.log(lengthOfLIS([0,1,0,3,2,3]));        // Expected: 4
console.log(lengthOfLIS([7,7,7,7,7,7,7]));      // Expected: 1`,
      python: `def lengthOfLIS(nums):
    # Write your solution here
    pass

# Test cases
print(lengthOfLIS([10,9,2,5,3,7,101,18]))  # Expected: 4
print(lengthOfLIS([0,1,0,3,2,3]))          # Expected: 4
print(lengthOfLIS([7,7,7,7,7,7,7]))        # Expected: 1`,
      java: `class Solution {
    public static int lengthOfLIS(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(lengthOfLIS(new int[]{10,9,2,5,3,7,101,18})); // Expected: 4
        System.out.println(lengthOfLIS(new int[]{0,1,0,3,2,3}));         // Expected: 4
        System.out.println(lengthOfLIS(new int[]{7,7,7,7,7,7,7}));       // Expected: 1
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {10,9,2,5,3,7,101,18};
    cout << sol.lengthOfLIS(nums1) << endl; // Expected: 4

    vector<int> nums2 = {0,1,0,3,2,3};
    cout << sol.lengthOfLIS(nums2) << endl; // Expected: 4

    vector<int> nums3 = {7,7,7,7,7,7,7};
    cout << sol.lengthOfLIS(nums3) << endl; // Expected: 1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "4\n4\n1",
      python: "4\n4\n1",
      java: "4\n4\n1",
      cpp: "4\n4\n1",
    },
  },

  "palindromic-substrings": {
    id: "palindromic-substrings",
    title: "Palindromic Substrings",
    difficulty: "Medium",
    category: "String • Dynamic Programming",
    description: {
      text: "Given a string s, return the number of palindromic substrings in it. A string is a palindrome when it reads the same backward as forward. A substring is a contiguous sequence of characters within the string.",
      notes: [],
    },
    examples: [
      {
        input: 's = "abc"',
        output: "3",
        explanation: "Three palindromic substrings: 'a', 'b', 'c'.",
      },
      {
        input: 's = "aaa"',
        output: "6",
        explanation: "Six palindromic substrings: 'a', 'a', 'a', 'aa', 'aa', 'aaa'.",
      },
    ],
    constraints: ["1 ≤ s.length ≤ 1000", "s consists of lowercase English letters."],
    starterCode: {
      javascript: `function countSubstrings(s) {
  // Write your solution here
  
}

// Test cases
console.log(countSubstrings("abc"));  // Expected: 3
console.log(countSubstrings("aaa"));  // Expected: 6`,
      python: `def countSubstrings(s):
    # Write your solution here
    pass

# Test cases
print(countSubstrings("abc"))   # Expected: 3
print(countSubstrings("aaa"))   # Expected: 6`,
      java: `class Solution {
    public static int countSubstrings(String s) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(countSubstrings("abc"));  // Expected: 3
        System.out.println(countSubstrings("aaa"));  // Expected: 6
    }
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    int countSubstrings(string s) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.countSubstrings("abc") << endl;  // Expected: 3
    cout << sol.countSubstrings("aaa") << endl;  // Expected: 6
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n6",
      python: "3\n6",
      java: "3\n6",
      cpp: "3\n6",
    },
  },

  "word-break": {
    id: "word-break",
    title: "Word Break",
    difficulty: "Medium",
    category: "Dynamic Programming • Trie",
    description: {
      text: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
      notes: ["Note that the same word in the dictionary may be reused multiple times in the segmentation."],
    },
    examples: [
      {
        input: 's = "leetcode", wordDict = ["leet","code"]',
        output: "true",
        explanation: 'Return true because "leetcode" can be segmented as "leet code".',
      },
      {
        input: 's = "applepenapple", wordDict = ["apple","pen"]',
        output: "true",
        explanation: 'Return true because "applepenapple" can be segmented as "apple pen apple". Note that you are allowed to reuse a dictionary word.',
      },
      {
        input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]',
        output: "false",
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 300",
      "1 ≤ wordDict.length ≤ 1000",
      "1 ≤ wordDict[i].length ≤ 20",
      "s and wordDict[i] consist of only lowercase English letters.",
      "All the strings of wordDict are unique.",
    ],
    starterCode: {
      javascript: `function wordBreak(s, wordDict) {
  // Write your solution here
  
}

// Test cases
console.log(wordBreak("leetcode", ["leet","code"]));               // Expected: true
console.log(wordBreak("applepenapple", ["apple","pen"]));          // Expected: true
console.log(wordBreak("catsandog", ["cats","dog","sand","and","cat"])); // Expected: false`,
      python: `def wordBreak(s, wordDict):
    # Write your solution here
    pass

# Test cases
print(wordBreak("leetcode", ["leet","code"]))                # Expected: True
print(wordBreak("applepenapple", ["apple","pen"]))           # Expected: True
print(wordBreak("catsandog", ["cats","dog","sand","and","cat"])) # Expected: False`,
      java: `import java.util.*;

class Solution {
    public static boolean wordBreak(String s, List<String> wordDict) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(wordBreak("leetcode", Arrays.asList("leet","code"))); // Expected: true
        System.out.println(wordBreak("applepenapple", Arrays.asList("apple","pen"))); // Expected: true
        System.out.println(wordBreak("catsandog", Arrays.asList("cats","dog","sand","and","cat"))); // Expected: false
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <unordered_set>

using namespace std;

class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        // Write your solution here
        
        return false;
    }
};

int main() {
    Solution sol;
    vector<string> dict1 = {"leet","code"};
    cout << (sol.wordBreak("leetcode", dict1) ? "true" : "false") << endl; // Expected: true

    vector<string> dict2 = {"apple","pen"};
    cout << (sol.wordBreak("applepenapple", dict2) ? "true" : "false") << endl; // Expected: true

    vector<string> dict3 = {"cats","dog","sand","and","cat"};
    cout << (sol.wordBreak("catsandog", dict3) ? "true" : "false") << endl; // Expected: false
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\ntrue\nfalse",
      python: "True\nTrue\nFalse",
      java: "true\ntrue\nfalse",
      cpp: "true\ntrue\nfalse",
    },
  },

  "rotting-oranges": {
    id: "rotting-oranges",
    title: "Rotting Oranges",
    difficulty: "Medium",
    category: "Graph • BFS • Matrix",
    description: {
      text: "You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.",
      notes: [],
    },
    examples: [
      {
        input: "grid = [[2,1,1],[1,1,0],[0,1,1]]",
        output: "4",
      },
      {
        input: "grid = [[2,1,1],[0,1,1],[1,0,1]]",
        output: "-1",
        explanation: "The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.",
      },
      {
        input: "grid = [[0,2]]",
        output: "0",
        explanation: "Since there are already no fresh oranges at minute 0, the answer is just 0.",
      },
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 ≤ m, n ≤ 10",
      "grid[i][j] is 0, 1, or 2.",
    ],
    starterCode: {
      javascript: `function orangesRotting(grid) {
  // Write your solution here
  
}

// Test cases
console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]])); // Expected: 4
console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]])); // Expected: -1
console.log(orangesRotting([[0,2]]));                     // Expected: 0`,
      python: `def orangesRotting(grid):
    # Write your solution here
    pass

# Test cases
print(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]))  # Expected: 4
print(orangesRotting([[2,1,1],[0,1,1],[1,0,1]]))  # Expected: -1
print(orangesRotting([[0,2]]))                      # Expected: 0`,
      java: `class Solution {
    public static int orangesRotting(int[][] grid) {
        // Write your solution here
        
        return -1;
    }
    
    public static void main(String[] args) {
        System.out.println(orangesRotting(new int[][]{{2,1,1},{1,1,0},{0,1,1}})); // Expected: 4
        System.out.println(orangesRotting(new int[][]{{2,1,1},{0,1,1},{1,0,1}})); // Expected: -1
        System.out.println(orangesRotting(new int[][]{{0,2}}));                     // Expected: 0
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        // Write your solution here
        
        return -1;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> grid1 = {{2,1,1},{1,1,0},{0,1,1}};
    cout << sol.orangesRotting(grid1) << endl; // Expected: 4

    vector<vector<int>> grid2 = {{2,1,1},{0,1,1},{1,0,1}};
    cout << sol.orangesRotting(grid2) << endl; // Expected: -1

    vector<vector<int>> grid3 = {{0,2}};
    cout << sol.orangesRotting(grid3) << endl; // Expected: 0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "4\n-1\n0",
      python: "4\n-1\n0",
      java: "4\n-1\n0",
      cpp: "4\n-1\n0",
    },
  },

  "merge-intervals": {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Array • Sorting",
    description: {
      text: "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
      notes: [],
    },
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6].",
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Intervals [1,4] and [4,5] are considered overlapping.",
      },
    ],
    constraints: [
      "1 ≤ intervals.length ≤ 10⁴",
      "intervals[i].length == 2",
      "0 ≤ start_i ≤ end_i ≤ 10⁴",
    ],
    starterCode: {
      javascript: `function merge(intervals) {
  // Write your solution here
  
}

// Test cases
console.log(merge([[1,3],[2,6],[8,10],[15,18]])); // Expected: [[1,6],[8,10],[15,18]]
console.log(merge([[1,4],[4,5]]));                // Expected: [[1,5]]`,
      python: `def merge(intervals):
    # Write your solution here
    pass

# Test cases
print(merge([[1,3],[2,6],[8,10],[15,18]]))  # Expected: [[1,6],[8,10],[15,18]]
print(merge([[1,4],[4,5]]))                 # Expected: [[1,5]]`,
      java: `import java.util.*;

class Solution {
    public static int[][] merge(int[][] intervals) {
        // Write your solution here
        
        return new int[0][0];
    }
    
    public static void main(String[] args) {
        int[][] intervals1 = {{1,3},{2,6},{8,10},{15,18}};
        int[][] res1 = merge(intervals1);
        System.out.println(Arrays.deepToString(res1)); // Expected: [[1,6],[8,10],[15,18]]
        
        int[][] intervals2 = {{1,4},{4,5}};
        int[][] res2 = merge(intervals2);
        System.out.println(Arrays.deepToString(res2)); // Expected: [[1,5]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<vector<int>>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << "[" << v[i][0] << "," << v[i][1] << "]";
        if (i != v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<vector<int>> intervals1 = {{1,3},{2,6},{8,10},{15,18}};
    vector<vector<int>> res1 = sol.merge(intervals1);
    printVector(res1); // Expected: [[1,6],[8,10],[15,18]]
    
    vector<vector<int>> intervals2 = {{1,4},{4,5}};
    vector<vector<int>> res2 = sol.merge(intervals2);
    printVector(res2); // Expected: [[1,5]]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[1,6],[8,10],[15,18]]\n[[1,5]]",
      python: "[[1, 6], [8, 10], [15, 18]]\n[[1, 5]]",
      java: "[[1, 6], [8, 10], [15, 18]]\n[[1, 5]]",
      cpp: "[[1,6],[8,10],[15,18]]\n[[1,5]]",
    },
  },
  "combination-sum": {
    id: "combination-sum",
    title: "Combination Sum",
    difficulty: "Medium",
    category: "Array • Backtracking",
    description: {
      text: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.",
      notes: [
        "The same number may be chosen from candidates an unlimited number of times.",
        "Two combinations are unique if the frequency of at least one of the chosen numbers is different.",
      ],
    },
    examples: [
      {
        input: "candidates = [2,3,6,7], target = 7",
        output: "[[2,2,3],[7]]",
        explanation: "2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 7 is also a candidate, and 7 = 7.",
      },
      {
        input: "candidates = [2,3,5], target = 8",
        output: "[[2,2,2,2],[2,3,3],[3,5]]",
      },
      {
        input: "candidates = [2], target = 1",
        output: "[]",
      },
    ],
    constraints: [
      "1 ≤ candidates.length ≤ 30",
      "2 ≤ candidates[i] ≤ 40",
      "All elements of candidates are distinct.",
      "1 ≤ target ≤ 40",
    ],
    starterCode: {
      javascript: `function combinationSum(candidates, target) {
  // Write your solution here
  
}

// Test cases
console.log(combinationSum([2,3,6,7], 7));   // Expected: [[2,2,3],[7]]
console.log(combinationSum([2,3,5], 8));     // Expected: [[2,2,2,2],[2,3,3],[3,5]]
console.log(combinationSum([2], 1));         // Expected: []`,
      python: `def combinationSum(candidates, target):
    # Write your solution here
    pass

# Test cases
print(combinationSum([2,3,6,7], 7))   # Expected: [[2,2,3],[7]]
print(combinationSum([2,3,5], 8))     # Expected: [[2,2,2,2],[2,3,3],[3,5]]
print(combinationSum([2], 1))         # Expected: []`,
      java: `import java.util.*;

class Solution {
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(combinationSum(new int[]{2,3,6,7}, 7));   // Expected: [[2,2,3],[7]]
        System.out.println(combinationSum(new int[]{2,3,5}, 8));     // Expected: [[2,2,2,2],[2,3,3],[3,5]]
        System.out.println(combinationSum(new int[]{2}, 1));         // Expected: []
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<vector<int>>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << "[";
        for (size_t j = 0; j < v[i].size(); ++j) {
            cout << v[i][j];
            if (j != v[i].size()-1) cout << ",";
        }
        cout << "]";
        if (i != v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<int> cand1 = {2,3,6,7};
    vector<vector<int>> res1 = sol.combinationSum(cand1, 7);
    printVector(res1); // Expected: [[2,2,3],[7]]

    vector<int> cand2 = {2,3,5};
    vector<vector<int>> res2 = sol.combinationSum(cand2, 8);
    printVector(res2); // Expected: [[2,2,2,2],[2,3,3],[3,5]]

    vector<int> cand3 = {2};
    vector<vector<int>> res3 = sol.combinationSum(cand3, 1);
    printVector(res3); // Expected: []
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[2,2,3],[7]]\n[[2,2,2,2],[2,3,3],[3,5]]\n[]",
      python: "[[2, 2, 3], [7]]\n[[2, 2, 2, 2], [2, 3, 3], [3, 5]]\n[]",
      java: "[[2, 2, 3], [7]]\n[[2, 2, 2, 2], [2, 3, 3], [3, 5]]\n[]",
      cpp: "[[2,2,3],[7]]\n[[2,2,2,2],[2,3,3],[3,5]]\n[]",
    },
  },

  "permutations": {
    id: "permutations",
    title: "Permutations",
    difficulty: "Medium",
    category: "Array • Backtracking",
    description: {
      text: "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [1,2,3]",
        output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
      },
      {
        input: "nums = [0,1]",
        output: "[[0,1],[1,0]]",
      },
      {
        input: "nums = [1]",
        output: "[[1]]",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 6",
      "-10 ≤ nums[i] ≤ 10",
      "All the integers of nums are unique.",
    ],
    starterCode: {
      javascript: `function permute(nums) {
  // Write your solution here
  
}

// Test cases
console.log(permute([1,2,3])); // Expected: all permutations
console.log(permute([0,1]));   // Expected: [[0,1],[1,0]]
console.log(permute([1]));     // Expected: [[1]]`,
      python: `def permute(nums):
    # Write your solution here
    pass

# Test cases
print(permute([1,2,3]))  # Expected: all permutations
print(permute([0,1]))    # Expected: [[0,1],[1,0]]
print(permute([1]))      # Expected: [[1]]`,
      java: `import java.util.*;

class Solution {
    public static List<List<Integer>> permute(int[] nums) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(permute(new int[]{1,2,3})); // Expected: all permutations
        System.out.println(permute(new int[]{0,1}));   // Expected: [[0,1],[1,0]]
        System.out.println(permute(new int[]{1}));     // Expected: [[1]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<vector<int>>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << "[";
        for (size_t j = 0; j < v[i].size(); ++j) {
            cout << v[i][j];
            if (j != v[i].size()-1) cout << ",";
        }
        cout << "]";
        if (i != v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<int> nums1 = {1,2,3};
    vector<vector<int>> res1 = sol.permute(nums1);
    printVector(res1); // Expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

    vector<int> nums2 = {0,1};
    vector<vector<int>> res2 = sol.permute(nums2);
    printVector(res2); // Expected: [[0,1],[1,0]]

    vector<int> nums3 = {1};
    vector<vector<int>> res3 = sol.permute(nums3);
    printVector(res3); // Expected: [[1]]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n[[0,1],[1,0]]\n[[1]]",
      python: "[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]\n[[0, 1], [1, 0]]\n[[1]]",
      java: "[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]\n[[0, 1], [1, 0]]\n[[1]]",
      cpp: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n[[0,1],[1,0]]\n[[1]]",
    },
  },

  "subsets": {
    id: "subsets",
    title: "Subsets",
    difficulty: "Medium",
    category: "Array • Backtracking • Bit Manipulation",
    description: {
      text: "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [1,2,3]",
        output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
      },
      {
        input: "nums = [0]",
        output: "[[],[0]]",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 10",
      "-10 ≤ nums[i] ≤ 10",
      "All the numbers of nums are unique.",
    ],
    starterCode: {
      javascript: `function subsets(nums) {
  // Write your solution here
  
}

// Test cases
console.log(subsets([1,2,3])); // Expected: all subsets
console.log(subsets([0]));     // Expected: [[],[0]]`,
      python: `def subsets(nums):
    # Write your solution here
    pass

# Test cases
print(subsets([1,2,3]))  # Expected: all subsets
print(subsets([0]))      # Expected: [[],[0]]`,
      java: `import java.util.*;

class Solution {
    public static List<List<Integer>> subsets(int[] nums) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(subsets(new int[]{1,2,3})); // Expected: all subsets
        System.out.println(subsets(new int[]{0}));     // Expected: [[],[0]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<vector<int>>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << "[";
        for (size_t j = 0; j < v[i].size(); ++j) {
            cout << v[i][j];
            if (j != v[i].size()-1) cout << ",";
        }
        cout << "]";
        if (i != v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<int> nums1 = {1,2,3};
    vector<vector<int>> res1 = sol.subsets(nums1);
    printVector(res1); // Expected: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

    vector<int> nums2 = {0};
    vector<vector<int>> res2 = sol.subsets(nums2);
    printVector(res2); // Expected: [[],[0]]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\n[[],[0]]",
      python: "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]\n[[], [0]]",
      java: "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]\n[[], [0]]",
      cpp: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\n[[],[0]]",
    },
  },

  "find-median-from-data-stream": {
    id: "find-median-from-data-stream",
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    category: "Heap • Design",
    description: {
      text: "Implement the MedianFinder class: MedianFinder() initializes the object. void addNum(int num) adds the integer num from the data stream to the data structure. double findMedian() returns the median of all elements so far. If the size of the list is even, the median is the average of the two middle values.",
      notes: [],
    },
    examples: [
      {
        input: '["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]\n[[],[1],[2],[],[3],[]]',
        output: "[null,null,null,1.5,null,2.0]",
        explanation: "MedianFinder mf = new MedianFinder(); mf.addNum(1); mf.addNum(2); mf.findMedian(); // 1.5; mf.addNum(3); mf.findMedian(); // 2.0",
      },
    ],
    constraints: [
      "-10⁵ ≤ num ≤ 10⁵",
      "There will be at least one element in the data structure before calling findMedian.",
      "At most 5 * 10⁴ calls will be made to addNum and findMedian.",
    ],
    starterCode: {
      javascript: `class MedianFinder {
  constructor() {
    // Write your solution here
  }
  
  addNum(num) {
    // Write your solution here
  }
  
  findMedian() {
    // Write your solution here
  }
}

// Test cases
const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log(mf.findMedian()); // Expected: 1.5
mf.addNum(3);
console.log(mf.findMedian()); // Expected: 2.0`,
      python: `class MedianFinder:
    def __init__(self):
        # Write your solution here
        pass

    def addNum(self, num: int) -> None:
        # Write your solution here
        pass

    def findMedian(self) -> float:
        # Write your solution here
        pass

# Test cases
mf = MedianFinder()
mf.addNum(1)
mf.addNum(2)
print(mf.findMedian())  # Expected: 1.5
mf.addNum(3)
print(mf.findMedian())  # Expected: 2.0`,
      java: `import java.util.*;

class MedianFinder {
    public MedianFinder() {
        // Write your solution here
    }
    
    public void addNum(int num) {
        // Write your solution here
    }
    
    public double findMedian() {
        // Write your solution here
        return 0.0;
    }
    
    public static void main(String[] args) {
        MedianFinder mf = new MedianFinder();
        mf.addNum(1);
        mf.addNum(2);
        System.out.println(mf.findMedian()); // Expected: 1.5
        mf.addNum(3);
        System.out.println(mf.findMedian()); // Expected: 2.0
    }
}`,
      cpp: `#include <iostream>
#include <queue>
#include <vector>

using namespace std;

class MedianFinder {
public:
    MedianFinder() {
        // Write your solution here
    }
    
    void addNum(int num) {
        // Write your solution here
    }
    
    double findMedian() {
        // Write your solution here
        return 0.0;
    }
};

int main() {
    MedianFinder mf;
    mf.addNum(1);
    mf.addNum(2);
    cout << mf.findMedian() << endl; // Expected: 1.5
    mf.addNum(3);
    cout << mf.findMedian() << endl; // Expected: 2.0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "1.5\n2",
      python: "1.5\n2.0",
      java: "1.5\n2.0",
      cpp: "1.5\n2",
    },
  },

  "serialize-and-deserialize-binary-tree": {
    id: "serialize-and-deserialize-binary-tree",
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    category: "Tree • Design",
    description: {
      text: "Design an algorithm to serialize a binary tree into a string and deserialize it back to the original tree structure. The serialization format is up to you, you just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.",
      notes: [
        "Implement the Codec class:",
        "String serialize(TreeNode root) — Encodes a tree to a single string.",
        "TreeNode deserialize(String data) — Decodes your encoded data to tree.",
      ],
    },
    examples: [
      {
        input: "root = [1,2,3,null,null,4,5]",
        output: "[1,2,3,null,null,4,5]",
        explanation: "Any serialization format is acceptable as long as deserialize(serialize(root)) equals root.",
      },
      {
        input: "root = []",
        output: "[]",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 10⁴].",
      "-1000 ≤ Node.val ≤ 1000",
    ],
    starterCode: {
      javascript: `// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

function serialize(root) {
  // Write your solution here
  
}

function deserialize(data) {
  // Write your solution here
  
}

// Helper to create tree from array
function createTree(arr) {
  if (arr.length === 0) return null;
  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    let node = queue.shift();
    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function printTree(root) {
  if (!root) { console.log("[]"); return; }
  let res = [];
  let q = [root];
  while (q.length) {
    let node = q.shift();
    if (node) {
      res.push(node.val);
      q.push(node.left);
      q.push(node.right);
    } else {
      res.push(null);
    }
  }
  while (res[res.length-1] === null) res.pop();
  console.log(JSON.stringify(res));
}

// Test cases
let root1 = createTree([1,2,3,null,null,4,5]);
let data1 = serialize(root1);
let newRoot1 = deserialize(data1);
printTree(newRoot1); // Expected: [1,2,3,null,null,4,5]

let root2 = createTree([]);
let data2 = serialize(root2);
let newRoot2 = deserialize(data2);
printTree(newRoot2); // Expected: []`,
      python: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Codec:
    def serialize(self, root):
        # Write your solution here
        pass

    def deserialize(self, data):
        # Write your solution here
        pass

# Helper to create tree
from collections import deque
def createTree(arr):
    if not arr: return None
    root = TreeNode(arr[0])
    q = deque([root])
    i = 1
    while q and i < len(arr):
        node = q.popleft()
        if arr[i] is not None:
            node.left = TreeNode(arr[i])
            q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            q.append(node.right)
        i += 1
    return root

def printTree(root):
    if not root: print("[]"); return
    res = []
    q = [root]
    while q:
        node = q.pop(0)
        if node:
            res.append(node.val)
            q.append(node.left)
            q.append(node.right)
        else:
            res.append(None)
    while res and res[-1] is None:
        res.pop()
    print(str(res).replace("None","null"))

# Test cases
codec = Codec()
root1 = createTree([1,2,3,None,None,4,5])
data1 = codec.serialize(root1)
newRoot1 = codec.deserialize(data1)
printTree(newRoot1) # Expected: [1,2,3,null,null,4,5]

root2 = createTree([])
data2 = codec.serialize(root2)
newRoot2 = codec.deserialize(data2)
printTree(newRoot2) # Expected: []`,
      java: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

class Codec {
    public String serialize(TreeNode root) {
        // Write your solution here
        return "";
    }

    public TreeNode deserialize(String data) {
        // Write your solution here
        return null;
    }
}

public class Main {
    public static TreeNode createTree(Integer[] arr) {
        if (arr.length == 0) return null;
        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < arr.length) {
            TreeNode node = q.poll();
            if (arr[i] != null) {
                node.left = new TreeNode(arr[i]);
                q.offer(node.left);
            }
            i++;
            if (i < arr.length && arr[i] != null) {
                node.right = new TreeNode(arr[i]);
                q.offer(node.right);
            }
            i++;
        }
        return root;
    }

    public static void printTree(TreeNode root) {
        if (root == null) { System.out.println("[]"); return; }
        List<Integer> res = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            if (node != null) {
                res.add(node.val);
                q.offer(node.left);
                q.offer(node.right);
            } else {
                res.add(null);
            }
        }
        while (res.size()>0 && res.get(res.size()-1) == null) res.remove(res.size()-1);
        System.out.println(res.toString().replace(" ",""));
    }

    public static void main(String[] args) {
        Codec codec = new Codec();
        TreeNode root1 = createTree(new Integer[]{1,2,3,null,null,4,5});
        String data1 = codec.serialize(root1);
        TreeNode newRoot1 = codec.deserialize(data1);
        printTree(newRoot1); // Expected: [1,2,3,null,null,4,5]

        TreeNode root2 = createTree(new Integer[]{});
        String data2 = codec.serialize(root2);
        TreeNode newRoot2 = codec.deserialize(data2);
        printTree(newRoot2); // Expected: []
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
#include <queue>
#include <sstream>

using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Codec {
public:
    string serialize(TreeNode* root) {
        // Write your solution here
        return "";
    }

    TreeNode* deserialize(string data) {
        // Write your solution here
        return NULL;
    }
};

TreeNode* createTree(vector<int> arr) {
    if (arr.empty()) return nullptr;
    TreeNode* root = new TreeNode(arr[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < arr.size()) {
        TreeNode* node = q.front(); q.pop();
        if (arr[i] != -1) {
            node->left = new TreeNode(arr[i]);
            q.push(node->left);
        }
        i++;
        if (i < arr.size() && arr[i] != -1) {
            node->right = new TreeNode(arr[i]);
            q.push(node->right);
        }
        i++;
    }
    return root;
}

void printTree(TreeNode* root) {
    if (!root) { cout << "[]" << endl; return; }
    vector<int> res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front(); q.pop();
        if (node) {
            res.push_back(node->val);
            q.push(node->left);
            q.push(node->right);
        } else {
            res.push_back(-1);
        }
    }
    while (!res.empty() && res.back() == -1) res.pop_back();
    cout << "[";
    for (size_t i = 0; i < res.size(); ++i) {
        if (res[i] == -1) cout << "null";
        else cout << res[i];
        if (i != res.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Codec codec;
    TreeNode* root1 = createTree({1,2,3,-1,-1,4,5}); // -1 = null
    string data1 = codec.serialize(root1);
    TreeNode* newRoot1 = codec.deserialize(data1);
    printTree(newRoot1); // Expected: [1,2,3,null,null,4,5]

    TreeNode* root2 = createTree({});
    string data2 = codec.serialize(root2);
    TreeNode* newRoot2 = codec.deserialize(data2);
    printTree(newRoot2); // Expected: []
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,2,3,null,null,4,5]\n[]",
      python: "[1,2,3,null,null,4,5]\n[]",
      java: "[1,2,3,null,null,4,5]\n[]",
      cpp: "[1,2,3,null,null,4,5]\n[]",
    },
  },
    "longest-common-subsequence": {
    id: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: {
      text: "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
      notes: [
        "A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.",
        "A common subsequence of two strings is a subsequence that is common to both strings.",
      ],
    },
    examples: [
      {
        input: 'text1 = "abcde", text2 = "ace"',
        output: "3",
        explanation: "The longest common subsequence is 'ace' and its length is 3.",
      },
      {
        input: 'text1 = "abc", text2 = "abc"',
        output: "3",
      },
      {
        input: 'text1 = "abc", text2 = "def"',
        output: "0",
      },
    ],
    constraints: [
      "1 ≤ text1.length, text2.length ≤ 1000",
      "text1 and text2 consist of only lowercase English characters.",
    ],
    starterCode: {
      javascript: `function longestCommonSubsequence(text1, text2) {
  // Write your solution here
  
}

// Test cases
console.log(longestCommonSubsequence("abcde", "ace")); // Expected: 3
console.log(longestCommonSubsequence("abc", "abc"));   // Expected: 3
console.log(longestCommonSubsequence("abc", "def"));   // Expected: 0`,
      python: `def longestCommonSubsequence(text1, text2):
    # Write your solution here
    pass

# Test cases
print(longestCommonSubsequence("abcde", "ace"))  # Expected: 3
print(longestCommonSubsequence("abc", "abc"))    # Expected: 3
print(longestCommonSubsequence("abc", "def"))    # Expected: 0`,
      java: `class Solution {
    public static int longestCommonSubsequence(String text1, String text2) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(longestCommonSubsequence("abcde", "ace")); // Expected: 3
        System.out.println(longestCommonSubsequence("abc", "abc"));   // Expected: 3
        System.out.println(longestCommonSubsequence("abc", "def"));   // Expected: 0
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.longestCommonSubsequence("abcde", "ace") << endl; // Expected: 3
    cout << sol.longestCommonSubsequence("abc", "abc") << endl;   // Expected: 3
    cout << sol.longestCommonSubsequence("abc", "def") << endl;   // Expected: 0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n3\n0",
      python: "3\n3\n0",
      java: "3\n3\n0",
      cpp: "3\n3\n0",
    },
  },

  "insert-interval": {
    id: "insert-interval",
    title: "Insert Interval",
    difficulty: "Medium",
    category: "Array",
    description: {
      text: "You are given an array of non-overlapping intervals intervals where intervals[i] = [start_i, end_i] represent the start and the end of the ith interval and intervals is sorted in ascending order by start_i. You are also given an interval newInterval = [start, end] that represents the start and end of another interval. Insert newInterval into intervals such that intervals is still sorted in ascending order by start_i and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary). Return intervals after the insertion.",
      notes: ["You don't need to modify intervals in-place. You can make a new array and return it."],
    },
    examples: [
      {
        input: "intervals = [[1,3],[6,9]], newInterval = [2,5]",
        output: "[[1,5],[6,9]]",
      },
      {
        input: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
        output: "[[1,2],[3,10],[12,16]]",
        explanation: "Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].",
      },
    ],
    constraints: [
      "0 ≤ intervals.length ≤ 10⁴",
      "intervals[i].length == 2",
      "0 ≤ start_i ≤ end_i ≤ 10⁵",
      "intervals is sorted by start_i in ascending order.",
      "newInterval.length == 2",
      "0 ≤ start ≤ end ≤ 10⁵",
    ],
    starterCode: {
      javascript: `function insert(intervals, newInterval) {
  // Write your solution here
  
}

// Test cases
console.log(insert([[1,3],[6,9]], [2,5])); // Expected: [[1,5],[6,9]]
console.log(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8])); // Expected: [[1,2],[3,10],[12,16]]`,
      python: `def insert(intervals, newInterval):
    # Write your solution here
    pass

# Test cases
print(insert([[1,3],[6,9]], [2,5]))  # Expected: [[1,5],[6,9]]
print(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]))  # Expected: [[1,2],[3,10],[12,16]]`,
      java: `import java.util.*;

class Solution {
    public static int[][] insert(int[][] intervals, int[] newInterval) {
        // Write your solution here
        
        return new int[0][0];
    }
    
    public static void main(String[] args) {
        int[][] intervals1 = {{1,3},{6,9}};
        int[] newInt1 = {2,5};
        int[][] res1 = insert(intervals1, newInt1);
        System.out.println(Arrays.deepToString(res1)); // Expected: [[1,5],[6,9]]
        
        int[][] intervals2 = {{1,2},{3,5},{6,7},{8,10},{12,16}};
        int[] newInt2 = {4,8};
        int[][] res2 = insert(intervals2, newInt2);
        System.out.println(Arrays.deepToString(res2)); // Expected: [[1,2],[3,10],[12,16]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<vector<int>>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << "[" << v[i][0] << "," << v[i][1] << "]";
        if (i != v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<vector<int>> intervals1 = {{1,3},{6,9}};
    vector<int> newInt1 = {2,5};
    auto res1 = sol.insert(intervals1, newInt1);
    printVector(res1); // Expected: [[1,5],[6,9]]

    vector<vector<int>> intervals2 = {{1,2},{3,5},{6,7},{8,10},{12,16}};
    vector<int> newInt2 = {4,8};
    auto res2 = sol.insert(intervals2, newInt2);
    printVector(res2); // Expected: [[1,2],[3,10],[12,16]]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[1,5],[6,9]]\n[[1,2],[3,10],[12,16]]",
      python: "[[1,5],[6,9]]\n[[1,2],[3,10],[12,16]]",
      java: "[[1, 5], [6, 9]]\n[[1, 2], [3, 10], [12, 16]]",
      cpp: "[[1,5],[6,9]]\n[[1,2],[3,10],[12,16]]",
    },
  },

  "meeting-rooms-ii": {
    id: "meeting-rooms-ii",
    title: "Meeting Rooms II",
    difficulty: "Medium",
    category: "Intervals • Heap • Greedy",
    description: {
      text: "Given an array of meeting time intervals intervals where intervals[i] = [start_i, end_i], return the minimum number of conference rooms required.",
      notes: [],
    },
    examples: [
      {
        input: "intervals = [[0,30],[5,10],[15,20]]",
        output: "2",
      },
      {
        input: "intervals = [[7,10],[2,4]]",
        output: "1",
      },
    ],
    constraints: [
      "1 ≤ intervals.length ≤ 10⁴",
      "0 ≤ start_i < end_i ≤ 10⁶",
    ],
    starterCode: {
      javascript: `function minMeetingRooms(intervals) {
  // Write your solution here
  
}

// Test cases
console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // Expected: 2
console.log(minMeetingRooms([[7,10],[2,4]]));           // Expected: 1`,
      python: `def minMeetingRooms(intervals):
    # Write your solution here
    pass

# Test cases
print(minMeetingRooms([[0,30],[5,10],[15,20]]))  # Expected: 2
print(minMeetingRooms([[7,10],[2,4]]))            # Expected: 1`,
      java: `import java.util.*;

class Solution {
    public static int minMeetingRooms(int[][] intervals) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(minMeetingRooms(new int[][]{{0,30},{5,10},{15,20}})); // Expected: 2
        System.out.println(minMeetingRooms(new int[][]{{7,10},{2,4}}));           // Expected: 1
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>

using namespace std;

class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> intervals1 = {{0,30},{5,10},{15,20}};
    cout << sol.minMeetingRooms(intervals1) << endl; // Expected: 2

    vector<vector<int>> intervals2 = {{7,10},{2,4}};
    cout << sol.minMeetingRooms(intervals2) << endl; // Expected: 1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "2\n1",
      python: "2\n1",
      java: "2\n1",
      cpp: "2\n1",
    },
  },

  "graph-valid-tree": {
    id: "graph-valid-tree",
    title: "Graph Valid Tree",
    difficulty: "Medium",
    category: "Graph • Union Find • DFS",
    description: {
      text: "Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.",
      notes: [
        "You can assume that no duplicate edges will appear in edges. Since all edges are undirected, [0,1] is the same as [1,0] and thus will not appear together in edges.",
      ],
    },
    examples: [
      {
        input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
        output: "true",
      },
      {
        input: "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
        output: "false",
        explanation: "There is a cycle.",
      },
    ],
    constraints: [
      "1 ≤ n ≤ 2000",
      "0 ≤ edges.length ≤ 5000",
      "edges[i].length == 2",
      "0 ≤ a_i, b_i < n",
      "a_i ≠ b_i",
      "There are no self loops or repeated edges.",
    ],
    starterCode: {
      javascript: `function validTree(n, edges) {
  // Write your solution here
  
}

// Test cases
console.log(validTree(5, [[0,1],[0,2],[0,3],[1,4]])); // Expected: true
console.log(validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])); // Expected: false`,
      python: `def validTree(n, edges):
    # Write your solution here
    pass

# Test cases
print(validTree(5, [[0,1],[0,2],[0,3],[1,4]]))  # Expected: True
print(validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]]))  # Expected: False`,
      java: `import java.util.*;

class Solution {
    public static boolean validTree(int n, int[][] edges) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(validTree(5, new int[][]{{0,1},{0,2},{0,3},{1,4}})); // Expected: true
        System.out.println(validTree(5, new int[][]{{0,1},{1,2},{2,3},{1,3},{1,4}})); // Expected: false
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        // Write your solution here
        
        return false;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> edges1 = {{0,1},{0,2},{0,3},{1,4}};
    cout << (sol.validTree(5, edges1) ? "true" : "false") << endl; // Expected: true

    vector<vector<int>> edges2 = {{0,1},{1,2},{2,3},{1,3},{1,4}};
    cout << (sol.validTree(5, edges2) ? "true" : "false") << endl; // Expected: false
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
      cpp: "true\nfalse",
    },
  },

  "alien-dictionary": {
    id: "alien-dictionary",
    title: "Alien Dictionary",
    difficulty: "Hard",
    category: "Graph • Topological Sort",
    description: {
      text: "There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you. You are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language. Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there are multiple solutions, return any of them. If there is no solution, return an empty string.",
      notes: [
        "You may assume that all strings are in lowercase English letters.",
        "A string s is lexicographically smaller than a string t if at the first letter where they differ, the letter in s comes before the letter in t in the alien language. If the first min(s.length, t.length) letters are the same, then s is smaller if and only if s.length < t.length.",
      ],
    },
    examples: [
      {
        input: 'words = ["wrt","wrf","er","ett","rftt"]',
        output: '"wertf"',
      },
      {
        input: 'words = ["z","x"]',
        output: '"zx"',
      },
      {
        input: 'words = ["z","x","z"]',
        output: '""',
        explanation: 'The order is invalid, so return "".',
      },
    ],
    constraints: [
      "1 ≤ words.length ≤ 100",
      "1 ≤ words[i].length ≤ 100",
      "words[i] consists of only lowercase English letters.",
    ],
    starterCode: {
      javascript: `function alienOrder(words) {
  // Write your solution here
  
}

// Test cases
console.log(alienOrder(["wrt","wrf","er","ett","rftt"])); // Expected: "wertf"
console.log(alienOrder(["z","x"]));                       // Expected: "zx"
console.log(alienOrder(["z","x","z"]));                   // Expected: ""`,
      python: `def alienOrder(words):
    # Write your solution here
    pass

# Test cases
print(alienOrder(["wrt","wrf","er","ett","rftt"]))  # Expected: "wertf"
print(alienOrder(["z","x"]))                        # Expected: "zx"
print(alienOrder(["z","x","z"]))                    # Expected: ""`,
      java: `import java.util.*;

class Solution {
    public static String alienOrder(String[] words) {
        // Write your solution here
        
        return "";
    }
    
    public static void main(String[] args) {
        System.out.println(alienOrder(new String[]{"wrt","wrf","er","ett","rftt"})); // Expected: "wertf"
        System.out.println(alienOrder(new String[]{"z","x"}));                       // Expected: "zx"
        System.out.println(alienOrder(new String[]{"z","x","z"}));                   // Expected: ""
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <queue>

using namespace std;

class Solution {
public:
    string alienOrder(vector<string>& words) {
        // Write your solution here
        
        return "";
    }
};

int main() {
    Solution sol;
    vector<string> words1 = {"wrt","wrf","er","ett","rftt"};
    cout << sol.alienOrder(words1) << endl; // Expected: "wertf"

    vector<string> words2 = {"z","x"};
    cout << sol.alienOrder(words2) << endl; // Expected: "zx"

    vector<string> words3 = {"z","x","z"};
    cout << sol.alienOrder(words3) << endl; // Expected: ""
    return 0;
}`,
    },
    expectedOutput: {
      javascript: '"wertf"\n"zx"\n""',
      python: '"wertf"\n"zx"\n""',
      java: 'wertf\nzx\n',
      cpp: 'wertf\nzx\n',
    },
  },
    "jump-game": {
    id: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    category: "Array • Greedy • Dynamic Programming",
    description: {
      text: "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "true",
        explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
      },
      {
        input: "nums = [3,2,1,0,4]",
        output: "false",
        explanation: "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴", "0 ≤ nums[i] ≤ 10⁵"],
    starterCode: {
      javascript: `function canJump(nums) {\n  // Write your solution here\n  \n}\n\n// Test cases\nconsole.log(canJump([2,3,1,1,4])); // Expected: true\nconsole.log(canJump([3,2,1,0,4])); // Expected: false`,
      python: `def canJump(nums):\n    # Write your solution here\n    pass\n\n# Test cases\nprint(canJump([2,3,1,1,4]))  # Expected: True\nprint(canJump([3,2,1,0,4]))  # Expected: False`,
      java: `class Solution {\n    public static boolean canJump(int[] nums) {\n        // Write your solution here\n        \n        return false;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(canJump(new int[]{2,3,1,1,4})); // Expected: true\n        System.out.println(canJump(new int[]{3,2,1,0,4})); // Expected: false\n    }\n}`,
      cpp: `#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        // Write your solution here\n        \n        return false;\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> nums1 = {2,3,1,1,4};\n    cout << (sol.canJump(nums1) ? "true" : "false") << endl; // Expected: true\n    vector<int> nums2 = {3,2,1,0,4};\n    cout << (sol.canJump(nums2) ? "true" : "false") << endl; // Expected: false\n    return 0;\n}`
    },
    expectedOutput: { javascript: "true\nfalse", python: "True\nFalse", java: "true\nfalse", cpp: "true\nfalse" }
  },
  "decode-ways": {
    id: "decode-ways",
    title: "Decode Ways",
    difficulty: "Medium",
    category: "String • Dynamic Programming",
    description: {
      text: "A message containing letters from A-Z can be encoded into numbers using the following mapping: 'A' -> '1', 'B' -> '2', ..., 'Z' -> '26'. Given a string s containing only digits, return the number of ways to decode it.",
      notes: ["The test cases are generated so that the answer fits in a 32-bit integer."],
    },
    examples: [
      { input: 's = "12"', output: "2", explanation: '"12" could be decoded as "AB" (1 2) or "L" (12).' },
      { input: 's = "226"', output: "3", explanation: '"226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).' },
      { input: 's = "06"', output: "0", explanation: '"06" cannot be mapped because "0" is invalid, and "06" is not valid.' },
    ],
    constraints: ["1 ≤ s.length ≤ 100", "s contains only digits and may contain leading zero(s)."],
    starterCode: {
      javascript: `function numDecodings(s) {\n  // Write your solution here\n  \n}\n\n// Test cases\nconsole.log(numDecodings("12")); // Expected: 2\nconsole.log(numDecodings("226")); // Expected: 3\nconsole.log(numDecodings("06")); // Expected: 0`,
      python: `def numDecodings(s):\n    # Write your solution here\n    pass\n\n# Test cases\nprint(numDecodings("12"))   # Expected: 2\nprint(numDecodings("226"))  # Expected: 3\nprint(numDecodings("06"))   # Expected: 0`,
      java: `class Solution {\n    public static int numDecodings(String s) {\n        // Write your solution here\n        \n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(numDecodings("12")); // Expected: 2\n        System.out.println(numDecodings("226")); // Expected: 3\n        System.out.println(numDecodings("06")); // Expected: 0\n    }\n}`,
      cpp: `#include <iostream>\n#include <string>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int numDecodings(string s) {\n        // Write your solution here\n        \n        return 0;\n    }\n};\n\nint main() {\n    Solution sol;\n    cout << sol.numDecodings("12") << endl;  // Expected: 2\n    cout << sol.numDecodings("226") << endl; // Expected: 3\n    cout << sol.numDecodings("06") << endl;  // Expected: 0\n    return 0;\n}`
    },
    expectedOutput: { javascript: "2\n3\n0", python: "2\n3\n0", java: "2\n3\n0", cpp: "2\n3\n0" }
  },
  "house-robber-ii": {
    id: "house-robber-ii",
    title: "House Robber II",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: {
      text: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
      notes: [],
    },
    examples: [
      { input: "nums = [2,3,2]", output: "3", explanation: "You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses." },
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4." },
      { input: "nums = [1,2,3]", output: "3" },
    ],
    constraints: ["1 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 1000"],
    starterCode: {
      javascript: `function rob(nums) {\n  // Write your solution here\n  \n}\n\n// Test cases\nconsole.log(rob([2,3,2]));   // Expected: 3\nconsole.log(rob([1,2,3,1])); // Expected: 4\nconsole.log(rob([1,2,3]));   // Expected: 3`,
      python: `def rob(nums):\n    # Write your solution here\n    pass\n\n# Test cases\nprint(rob([2,3,2]))    # Expected: 3\nprint(rob([1,2,3,1]))  # Expected: 4\nprint(rob([1,2,3]))    # Expected: 3`,
      java: `class Solution {\n    public static int rob(int[] nums) {\n        // Write your solution here\n        \n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(rob(new int[]{2,3,2}));   // Expected: 3\n        System.out.println(rob(new int[]{1,2,3,1})); // Expected: 4\n        System.out.println(rob(new int[]{1,2,3}));   // Expected: 3\n    }\n}`,
      cpp: `#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int rob(vector<int>& nums) {\n        // Write your solution here\n        \n        return 0;\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> nums1 = {2,3,2};\n    cout << sol.rob(nums1) << endl; // Expected: 3\n    vector<int> nums2 = {1,2,3,1};\n    cout << sol.rob(nums2) << endl; // Expected: 4\n    vector<int> nums3 = {1,2,3};\n    cout << sol.rob(nums3) << endl; // Expected: 3\n    return 0;\n}`
    },
    expectedOutput: { javascript: "3\n4\n3", python: "3\n4\n3", java: "3\n4\n3", cpp: "3\n4\n3" }
  },
  "word-search-ii": {
    id: "word-search-ii",
    title: "Word Search II",
    difficulty: "Hard",
    category: "Trie • Backtracking • Matrix",
    description: {
      text: "Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.",
      notes: [],
    },
    examples: [
      {
        input: `board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]`,
        output: '["eat","oath"]',
      },
      {
        input: `board = [["a","b"],["c","d"]], words = ["abcb"]`,
        output: "[]",
      },
    ],
    constraints: [
      "m == board.length",
      "n == board[i].length",
      "1 ≤ m, n ≤ 12",
      "board[i][j] is a lowercase English letter.",
      "1 ≤ words.length ≤ 3 * 10⁴",
      "1 ≤ words[i].length ≤ 10",
      "words[i] consists of lowercase English letters.",
      "All the strings of words are unique.",
    ],
    starterCode: {
      javascript: `function findWords(board, words) {\n  // Write your solution here\n  \n}\n\n// Test cases\nconst board1 = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]];\nconsole.log(findWords(board1, ["oath","pea","eat","rain"])); // Expected: ["eat","oath"] (any order)\nconst board2 = [["a","b"],["c","d"]];\nconsole.log(findWords(board2, ["abcb"])); // Expected: []`,
      python: `def findWords(board, words):\n    # Write your solution here\n    pass\n\n# Test cases\nboard1 = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]\nprint(findWords(board1, ["oath","pea","eat","rain"]))  # Expected: ["eat","oath"] (any order)\nboard2 = [["a","b"],["c","d"]]\nprint(findWords(board2, ["abcb"]))  # Expected: []`,
      java: `import java.util.*;\n\nclass Solution {\n    public static List<String> findWords(char[][] board, String[] words) {\n        // Write your solution here\n        \n        return new ArrayList<>();\n    }\n    \n    public static void main(String[] args) {\n        char[][] board1 = {{'o','a','a','n'},{'e','t','a','e'},{'i','h','k','r'},{'i','f','l','v'}};\n        System.out.println(findWords(board1, new String[]{"oath","pea","eat","rain"})); // Expected: [eat, oath] (any order)\n        char[][] board2 = {{'a','b'},{'c','d'}};\n        System.out.println(findWords(board2, new String[]{"abcb"})); // Expected: []\n    }\n}`,
      cpp: `#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {\n        // Write your solution here\n        \n        return {};\n    }\n};\n\nvoid printVector(const vector<string>& v) {\n    cout << "[";\n    for (size_t i = 0; i < v.size(); ++i) {\n        cout << "\\"" << v[i] << "\\"";\n        if (i != v.size()-1) cout << ", ";\n    }\n    cout << "]" << endl;\n}\n\nint main() {\n    Solution sol;\n    vector<vector<char>> board1 = {{'o','a','a','n'},{'e','t','a','e'},{'i','h','k','r'},{'i','f','l','v'}};\n    vector<string> words1 = {"oath","pea","eat","rain"};\n    vector<string> res1 = sol.findWords(board1, words1);\n    printVector(res1); // Expected: ["eat","oath"]\n\n    vector<vector<char>> board2 = {{'a','b'},{'c','d'}};\n    vector<string> words2 = {"abcb"};\n    vector<string> res2 = sol.findWords(board2, words2);\n    printVector(res2); // Expected: []\n    return 0;\n}`
    },
    expectedOutput: {
      javascript: '["eat","oath"]\n[]',
      python: '["eat", "oath"]\n[]',
      java: "[eat, oath]\n[]",
      cpp: '["eat", "oath"]\n[]'
    }
  },
  "non-overlapping-intervals": {
    id: "non-overlapping-intervals",
    title: "Non-overlapping Intervals",
    difficulty: "Medium",
    category: "Greedy • Sorting",
    description: {
      text: "Given an array of intervals intervals where intervals[i] = [start_i, end_i], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
      notes: [],
    },
    examples: [
      { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1", explanation: "[1,3] can be removed and the rest of the intervals are non-overlapping." },
      { input: "intervals = [[1,2],[1,2],[1,2]]", output: "2", explanation: "You need to remove two [1,2] to make the rest non-overlapping." },
      { input: "intervals = [[1,2],[2,3]]", output: "0", explanation: "No intervals overlap so no removals needed." },
    ],
    constraints: ["1 ≤ intervals.length ≤ 10⁵", "intervals[i].length == 2", "-5 * 10⁴ ≤ start_i < end_i ≤ 5 * 10⁴"],
    starterCode: {
      javascript: `function eraseOverlapIntervals(intervals) {\n  // Write your solution here\n  \n}\n\n// Test cases\nconsole.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // Expected: 1\nconsole.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]]));       // Expected: 2\nconsole.log(eraseOverlapIntervals([[1,2],[2,3]]));             // Expected: 0`,
      python: `def eraseOverlapIntervals(intervals):\n    # Write your solution here\n    pass\n\n# Test cases\nprint(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]))  # Expected: 1\nprint(eraseOverlapIntervals([[1,2],[1,2],[1,2]]))        # Expected: 2\nprint(eraseOverlapIntervals([[1,2],[2,3]]))              # Expected: 0`,
      java: `import java.util.*;\n\nclass Solution {\n    public static int eraseOverlapIntervals(int[][] intervals) {\n        // Write your solution here\n        \n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(eraseOverlapIntervals(new int[][]{{1,2},{2,3},{3,4},{1,3}})); // Expected: 1\n        System.out.println(eraseOverlapIntervals(new int[][]{{1,2},{1,2},{1,2}}));       // Expected: 2\n        System.out.println(eraseOverlapIntervals(new int[][]{{1,2},{2,3}}));             // Expected: 0\n    }\n}`,
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n        // Write your solution here\n        \n        return 0;\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<vector<int>> intervals1 = {{1,2},{2,3},{3,4},{1,3}};\n    cout << sol.eraseOverlapIntervals(intervals1) << endl; // Expected: 1\n    vector<vector<int>> intervals2 = {{1,2},{1,2},{1,2}};\n    cout << sol.eraseOverlapIntervals(intervals2) << endl; // Expected: 2\n    vector<vector<int>> intervals3 = {{1,2},{2,3}};\n    cout << sol.eraseOverlapIntervals(intervals3) << endl; // Expected: 0\n    return 0;\n}`
    },
    expectedOutput: { javascript: "1\n2\n0", python: "1\n2\n0", java: "1\n2\n0", cpp: "1\n2\n0" }
  },
    "maximum-product-subarray": {
    id: "maximum-product-subarray",
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    description: {
      text: "Given an integer array nums, find a subarray that has the largest product, and return the product.",
      notes: ["The product of a subarray is the product of all its elements."],
    },
    examples: [
      {
        input: "nums = [2,3,-2,4]",
        output: "6",
        explanation: "The subarray [2,3] has the largest product 6.",
      },
      {
        input: "nums = [-2,0,-1]",
        output: "0",
        explanation: "The result cannot be 2, because [-2,-1] is not a subarray.",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 2 * 10⁴",
      "-10 ≤ nums[i] ≤ 10",
      "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
    ],
    starterCode: {
      javascript: `function maxProduct(nums) {
  // Write your solution here
  
}

// Test cases
console.log(maxProduct([2,3,-2,4]));  // Expected: 6
console.log(maxProduct([-2,0,-1]));   // Expected: 0`,
      python: `def maxProduct(nums):
    # Write your solution here
    pass

# Test cases
print(maxProduct([2,3,-2,4]))  # Expected: 6
print(maxProduct([-2,0,-1]))   # Expected: 0`,
      java: `class Solution {
    public static int maxProduct(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxProduct(new int[]{2,3,-2,4})); // Expected: 6
        System.out.println(maxProduct(new int[]{-2,0,-1}));  // Expected: 0
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int maxProduct(vector<int>& nums) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {2,3,-2,4};
    cout << sol.maxProduct(nums1) << endl; // Expected: 6

    vector<int> nums2 = {-2,0,-1};
    cout << sol.maxProduct(nums2) << endl; // Expected: 0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "6\n0",
      python: "6\n0",
      java: "6\n0",
      cpp: "6\n0",
    },
  },

  "decode-string": {
    id: "decode-string",
    title: "Decode String",
    difficulty: "Medium",
    category: "Stack • String",
    description: {
      text: "Given an encoded string, return its decoded string. The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.",
      notes: [
        "You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc.",
        "You may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].",
      ],
    },
    examples: [
      {
        input: 's = "3[a]2[bc]"',
        output: '"aaabcbc"',
      },
      {
        input: 's = "3[a2[c]]"',
        output: '"accaccacc"',
      },
      {
        input: 's = "2[abc]3[cd]ef"',
        output: '"abcabccdcdcdef"',
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 30",
      "s consists of lowercase English letters, digits, and square brackets '[]'.",
      "s is guaranteed to be a valid input.",
      "All the integers in s are in the range [1, 300].",
    ],
    starterCode: {
      javascript: `function decodeString(s) {
  // Write your solution here
  
}

// Test cases
console.log(decodeString("3[a]2[bc]"));      // Expected: "aaabcbc"
console.log(decodeString("3[a2[c]]"));       // Expected: "accaccacc"
console.log(decodeString("2[abc]3[cd]ef"));  // Expected: "abcabccdcdcdef"`,
      python: `def decodeString(s):
    # Write your solution here
    pass

# Test cases
print(decodeString("3[a]2[bc]"))      # Expected: "aaabcbc"
print(decodeString("3[a2[c]]"))       # Expected: "accaccacc"
print(decodeString("2[abc]3[cd]ef"))  # Expected: "abcabccdcdcdef"`,
      java: `class Solution {
    public static String decodeString(String s) {
        // Write your solution here
        
        return "";
    }
    
    public static void main(String[] args) {
        System.out.println(decodeString("3[a]2[bc]"));      // Expected: "aaabcbc"
        System.out.println(decodeString("3[a2[c]]"));       // Expected: "accaccacc"
        System.out.println(decodeString("2[abc]3[cd]ef"));  // Expected: "abcabccdcdcdef"
    }
}`,
      cpp: `#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    string decodeString(string s) {
        // Write your solution here
        
        return "";
    }
};

int main() {
    Solution sol;
    cout << sol.decodeString("3[a]2[bc]") << endl;      // Expected: "aaabcbc"
    cout << sol.decodeString("3[a2[c]]") << endl;       // Expected: "accaccacc"
    cout << sol.decodeString("2[abc]3[cd]ef") << endl;  // Expected: "abcabccdcdcdef"
    return 0;
}`,
    },
    expectedOutput: {
      javascript: '"aaabcbc"\n"accaccacc"\n"abcabccdcdcdef"',
      python: '"aaabcbc"\n"accaccacc"\n"abcabccdcdcdef"',
      java: 'aaabcbc\naccaccacc\nabcabccdcdcdef',
      cpp: 'aaabcbc\naccaccacc\nabcabccdcdcdef',
    },
  },

  "lru-cache": {
    id: "lru-cache",
    title: "LRU Cache",
    difficulty: "Medium",
    category: "Design • Hash Table • Linked List",
    description: {
      text: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class:",
      notes: [
        "LRUCache(int capacity) Initialize the LRU cache with positive size capacity.",
        "int get(int key) Return the value of the key if the key exists, otherwise return -1.",
        "void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.",
        "The functions get and put must each run in O(1) average time complexity.",
      ],
    },
    examples: [
      {
        input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
        output: '[null,null,null,1,null,-1,null,-1,3,4]',
        explanation: "LRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // cache is {1=1}\nlRUCache.put(2, 2); // cache is {1=1, 2=2}\nlRUCache.get(1);    // return 1\nlRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}\nlRUCache.get(2);    // returns -1 (not found)\nlRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}\nlRUCache.get(1);    // return -1 (not found)\nlRUCache.get(3);    // return 3\nlRUCache.get(4);    // return 4",
      },
    ],
    constraints: [
      "1 ≤ capacity ≤ 3000",
      "0 ≤ key ≤ 10⁴",
      "0 ≤ value ≤ 10⁵",
      "At most 2 * 10⁵ calls will be made to get and put.",
    ],
    starterCode: {
      javascript: `class LRUCache {
  constructor(capacity) {
    // Write your solution here
  }
  
  get(key) {
    // Write your solution here
  }
  
  put(key, value) {
    // Write your solution here
  }
}

// Test cases
const lRUCache = new LRUCache(2);
lRUCache.put(1, 1);
lRUCache.put(2, 2);
console.log(lRUCache.get(1));    // Expected: 1
lRUCache.put(3, 3);               // Evicts key 2
console.log(lRUCache.get(2));    // Expected: -1
lRUCache.put(4, 4);               // Evicts key 1
console.log(lRUCache.get(1));    // Expected: -1
console.log(lRUCache.get(3));    // Expected: 3
console.log(lRUCache.get(4));    // Expected: 4`,
      python: `class LRUCache:
    def __init__(self, capacity: int):
        # Write your solution here
        pass

    def get(self, key: int) -> int:
        # Write your solution here
        pass

    def put(self, key: int, value: int) -> None:
        # Write your solution here
        pass

# Test cases
lru = LRUCache(2)
lru.put(1, 1)
lru.put(2, 2)
print(lru.get(1))    # Expected: 1
lru.put(3, 3)        # Evicts key 2
print(lru.get(2))    # Expected: -1
lru.put(4, 4)        # Evicts key 1
print(lru.get(1))    # Expected: -1
print(lru.get(3))    # Expected: 3
print(lru.get(4))    # Expected: 4`,
      java: `import java.util.*;

class LRUCache {
    public LRUCache(int capacity) {
        // Write your solution here
    }
    
    public int get(int key) {
        // Write your solution here
        return -1;
    }
    
    public void put(int key, int value) {
        // Write your solution here
    }
    
    public static void main(String[] args) {
        LRUCache lru = new LRUCache(2);
        lru.put(1, 1);
        lru.put(2, 2);
        System.out.println(lru.get(1)); // Expected: 1
        lru.put(3, 3);                  // Evicts key 2
        System.out.println(lru.get(2)); // Expected: -1
        lru.put(4, 4);                  // Evicts key 1
        System.out.println(lru.get(1)); // Expected: -1
        System.out.println(lru.get(3)); // Expected: 3
        System.out.println(lru.get(4)); // Expected: 4
    }
}`,
      cpp: `#include <iostream>
#include <unordered_map>

using namespace std;

class LRUCache {
public:
    LRUCache(int capacity) {
        // Write your solution here
    }
    
    int get(int key) {
        // Write your solution here
        return -1;
    }
    
    void put(int key, int value) {
        // Write your solution here
    }
};

int main() {
    LRUCache lru(2);
    lru.put(1, 1);
    lru.put(2, 2);
    cout << lru.get(1) << endl; // Expected: 1
    lru.put(3, 3);               // Evicts key 2
    cout << lru.get(2) << endl; // Expected: -1
    lru.put(4, 4);               // Evicts key 1
    cout << lru.get(1) << endl; // Expected: -1
    cout << lru.get(3) << endl; // Expected: 3
    cout << lru.get(4) << endl; // Expected: 4
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "1\n-1\n-1\n3\n4",
      python: "1\n-1\n-1\n3\n4",
      java: "1\n-1\n-1\n3\n4",
      cpp: "1\n-1\n-1\n3\n4",
    },
  },

  "word-ladder": {
    id: "word-ladder",
    title: "Word Ladder",
    difficulty: "Hard",
    category: "Graph • BFS • Hash Table",
    description: {
      text: "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that every adjacent pair of words differs by a single letter, and every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList. Return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
      notes: [],
    },
    examples: [
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: "5",
        explanation: "One shortest transformation sequence is 'hit' -> 'hot' -> 'dot' -> 'dog' -> 'cog', which is 5 words long.",
      },
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
        output: "0",
        explanation: "The endWord 'cog' is not in wordList, therefore there is no valid transformation sequence.",
      },
    ],
    constraints: [
      "1 ≤ beginWord.length ≤ 10",
      "endWord.length == beginWord.length",
      "1 ≤ wordList.length ≤ 5000",
      "wordList[i].length == beginWord.length",
      "beginWord, endWord, and wordList[i] consist of lowercase English letters.",
      "beginWord != endWord",
      "All the words in wordList are unique.",
    ],
    starterCode: {
      javascript: `function ladderLength(beginWord, endWord, wordList) {
  // Write your solution here
  
}

// Test cases
console.log(ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"])); // Expected: 5
console.log(ladderLength("hit", "cog", ["hot","dot","dog","lot","log"]));       // Expected: 0`,
      python: `def ladderLength(beginWord, endWord, wordList):
    # Write your solution here
    pass

# Test cases
print(ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"]))  # Expected: 5
print(ladderLength("hit", "cog", ["hot","dot","dog","lot","log"]))        # Expected: 0`,
      java: `import java.util.*;

class Solution {
    public static int ladderLength(String beginWord, String endWord, List<String> wordList) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        List<String> wordList1 = Arrays.asList("hot","dot","dog","lot","log","cog");
        System.out.println(ladderLength("hit", "cog", wordList1)); // Expected: 5
        List<String> wordList2 = Arrays.asList("hot","dot","dog","lot","log");
        System.out.println(ladderLength("hit", "cog", wordList2)); // Expected: 0
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <unordered_set>
#include <queue>

using namespace std;

class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<string> wordList1 = {"hot","dot","dog","lot","log","cog"};
    cout << sol.ladderLength("hit", "cog", wordList1) << endl; // Expected: 5
    vector<string> wordList2 = {"hot","dot","dog","lot","log"};
    cout << sol.ladderLength("hit", "cog", wordList2) << endl; // Expected: 0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "5\n0",
      python: "5\n0",
      java: "5\n0",
      cpp: "5\n0",
    },
  },

  "lowest-common-ancestor-of-a-binary-tree": {
    id: "lowest-common-ancestor-of-a-binary-tree",
    title: "Lowest Common Ancestor of a Binary Tree",
    difficulty: "Medium",
    category: "Tree • DFS",
    description: {
      text: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree. According to the definition of LCA on Wikipedia: 'The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).'",
      notes: [],
    },
    examples: [
      {
        input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
        output: "3",
        explanation: "The LCA of nodes 5 and 1 is 3.",
      },
      {
        input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4",
        output: "5",
        explanation: "The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself.",
      },
      {
        input: "root = [1,2], p = 1, q = 2",
        output: "1",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [2, 10⁵].",
      "-10⁹ ≤ Node.val ≤ 10⁹",
      "All Node.val are unique.",
      "p != q",
      "p and q will exist in the tree.",
    ],
    starterCode: {
      javascript: `// Definition for a binary tree node.
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function lowestCommonAncestor(root, p, q) {
  // Write your solution here
  
}

// Helper to create tree and find nodes
function createTree(arr) {
  if (arr.length === 0) return null;
  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    let node = queue.shift();
    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function findNode(root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  return findNode(root.left, val) || findNode(root.right, val);
}

// Test cases
let root1 = createTree([3,5,1,6,2,0,8,null,null,7,4]);
let p1 = findNode(root1, 5);
let q1 = findNode(root1, 1);
console.log(lowestCommonAncestor(root1, p1, q1).val); // Expected: 3

let p2 = findNode(root1, 5);
let q2 = findNode(root1, 4);
console.log(lowestCommonAncestor(root1, p2, q2).val); // Expected: 5

let root2 = createTree([1,2]);
let p3 = findNode(root2, 1);
let q3 = findNode(root2, 2);
console.log(lowestCommonAncestor(root2, p3, q3).val); // Expected: 1`,
      python: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

def lowestCommonAncestor(root, p, q):
    # Write your solution here
    pass

# Helper functions
from collections import deque
def createTree(arr):
    if not arr: return None
    root = TreeNode(arr[0])
    q = deque([root])
    i = 1
    while q and i < len(arr):
        node = q.popleft()
        if arr[i] is not None:
            node.left = TreeNode(arr[i])
            q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            q.append(node.right)
        i += 1
    return root

def findNode(root, val):
    if not root: return None
    if root.val == val: return root
    left = findNode(root.left, val)
    if left: return left
    return findNode(root.right, val)

# Test cases
root1 = createTree([3,5,1,6,2,0,8,None,None,7,4])
p1 = findNode(root1, 5)
q1 = findNode(root1, 1)
print(lowestCommonAncestor(root1, p1, q1).val)  # Expected: 3

p2 = findNode(root1, 5)
q2 = findNode(root1, 4)
print(lowestCommonAncestor(root1, p2, q2).val)  # Expected: 5

root2 = createTree([1,2])
p3 = findNode(root2, 1)
q3 = findNode(root2, 2)
print(lowestCommonAncestor(root2, p3, q3).val)  # Expected: 1`,
      java: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Write your solution here
        
        return null;
    }
    
    public static TreeNode createTree(Integer[] arr) {
        if (arr.length == 0) return null;
        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (!queue.isEmpty() && i < arr.length) {
            TreeNode node = queue.poll();
            if (arr[i] != null) {
                node.left = new TreeNode(arr[i]);
                queue.offer(node.left);
            }
            i++;
            if (i < arr.length && arr[i] != null) {
                node.right = new TreeNode(arr[i]);
                queue.offer(node.right);
            }
            i++;
        }
        return root;
    }
    
    public static TreeNode findNode(TreeNode root, int val) {
        if (root == null) return null;
        if (root.val == val) return root;
        TreeNode left = findNode(root.left, val);
        if (left != null) return left;
        return findNode(root.right, val);
    }
    
    public static void main(String[] args) {
        TreeNode root1 = createTree(new Integer[]{3,5,1,6,2,0,8,null,null,7,4});
        TreeNode p1 = findNode(root1, 5);
        TreeNode q1 = findNode(root1, 1);
        System.out.println(lowestCommonAncestor(root1, p1, q1).val); // Expected: 3

        TreeNode p2 = findNode(root1, 5);
        TreeNode q2 = findNode(root1, 4);
        System.out.println(lowestCommonAncestor(root1, p2, q2).val); // Expected: 5

        TreeNode root2 = createTree(new Integer[]{1,2});
        TreeNode p3 = findNode(root2, 1);
        TreeNode q3 = findNode(root2, 2);
        System.out.println(lowestCommonAncestor(root2, p3, q3).val); // Expected: 1
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>

using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        // Write your solution here
        
        return nullptr;
    }
};

TreeNode* createTree(vector<int> arr) {
    if (arr.empty()) return nullptr;
    TreeNode* root = new TreeNode(arr[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < arr.size()) {
        TreeNode* node = q.front(); q.pop();
        if (arr[i] != -1) { // -1 represents null
            node->left = new TreeNode(arr[i]);
            q.push(node->left);
        }
        i++;
        if (i < arr.size() && arr[i] != -1) {
            node->right = new TreeNode(arr[i]);
            q.push(node->right);
        }
        i++;
    }
    return root;
}

TreeNode* findNode(TreeNode* root, int val) {
    if (!root) return nullptr;
    if (root->val == val) return root;
    TreeNode* left = findNode(root->left, val);
    if (left) return left;
    return findNode(root->right, val);
}

int main() {
    Solution sol;
    TreeNode* root1 = createTree({3,5,1,6,2,0,8,-1,-1,7,4}); // -1 = null
    TreeNode* p1 = findNode(root1, 5);
    TreeNode* q1 = findNode(root1, 1);
    cout << sol.lowestCommonAncestor(root1, p1, q1)->val << endl; // Expected: 3

    TreeNode* p2 = findNode(root1, 5);
    TreeNode* q2 = findNode(root1, 4);
    cout << sol.lowestCommonAncestor(root1, p2, q2)->val << endl; // Expected: 5

    TreeNode* root2 = createTree({1,2});
    TreeNode* p3 = findNode(root2, 1);
    TreeNode* q3 = findNode(root2, 2);
    cout << sol.lowestCommonAncestor(root2, p3, q3)->val << endl; // Expected: 1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n5\n1",
      python: "3\n5\n1",
      java: "3\n5\n1",
      cpp: "3\n5\n1",
    },
  },
    "find-minimum-in-rotated-sorted-array": {
    id: "find-minimum-in-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Array • Binary Search",
    description: {
      text: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become: [4,5,6,7,0,1,2] if it was rotated 4 times, or [0,1,2,4,5,6,7] if it was rotated 7 times. Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]]. Given the sorted rotated array nums of unique elements, return the minimum element of this array.",
      notes: ["You must write an algorithm that runs in O(log n) time."],
    },
    examples: [
      { input: "nums = [3,4,5,1,2]", output: "1", explanation: "The original array was [1,2,3,4,5] rotated 3 times." },
      { input: "nums = [4,5,6,7,0,1,2]", output: "0", explanation: "The original array was [0,1,2,4,5,6,7] and it was rotated 4 times." },
      { input: "nums = [11,13,15,17]", output: "11", explanation: "The original array was [11,13,15,17] and it was rotated 4 times." },
    ],
    constraints: ["n == nums.length", "1 ≤ n ≤ 5000", "-5000 ≤ nums[i] ≤ 5000", "All the integers of nums are unique.", "nums is sorted and rotated between 1 and n times."],
    starterCode: {
      javascript: `function findMin(nums) {
  // Write your solution here
  
}

// Test cases
console.log(findMin([3,4,5,1,2]));      // Expected: 1
console.log(findMin([4,5,6,7,0,1,2]));  // Expected: 0
console.log(findMin([11,13,15,17]));    // Expected: 11`,
      python: `def findMin(nums):
    # Write your solution here
    pass

# Test cases
print(findMin([3,4,5,1,2]))      # Expected: 1
print(findMin([4,5,6,7,0,1,2]))  # Expected: 0
print(findMin([11,13,15,17]))    # Expected: 11`,
      java: `class Solution {
    public static int findMin(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(findMin(new int[]{3,4,5,1,2}));      // Expected: 1
        System.out.println(findMin(new int[]{4,5,6,7,0,1,2}));  // Expected: 0
        System.out.println(findMin(new int[]{11,13,15,17}));    // Expected: 11
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int findMin(vector<int>& nums) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {3,4,5,1,2};
    cout << sol.findMin(nums1) << endl; // Expected: 1
    vector<int> nums2 = {4,5,6,7,0,1,2};
    cout << sol.findMin(nums2) << endl; // Expected: 0
    vector<int> nums3 = {11,13,15,17};
    cout << sol.findMin(nums3) << endl; // Expected: 11
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "1\n0\n11",
      python: "1\n0\n11",
      java: "1\n0\n11",
      cpp: "1\n0\n11",
    },
  },

  "binary-tree-right-side-view": {
    id: "binary-tree-right-side-view",
    title: "Binary Tree Right Side View",
    difficulty: "Medium",
    category: "Tree • BFS • DFS",
    description: {
      text: "Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
      notes: [],
    },
    examples: [
      { input: "root = [1,2,3,null,5,null,4]", output: "[1,3,4]" },
      { input: "root = [1,null,3]", output: "[1,3]" },
      { input: "root = []", output: "[]" },
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 100].", "-100 ≤ Node.val ≤ 100"],
    starterCode: {
      javascript: `function rightSideView(root) {
  // Write your solution here
  
}

// Helper to create tree
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}
function createTree(arr) {
  if (arr.length === 0) return null;
  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    let node = queue.shift();
    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

// Test cases
let root1 = createTree([1,2,3,null,5,null,4]);
console.log(rightSideView(root1)); // Expected: [1,3,4]
let root2 = createTree([1,null,3]);
console.log(rightSideView(root2)); // Expected: [1,3]
let root3 = createTree([]);
console.log(rightSideView(root3)); // Expected: []`,
      python: `def rightSideView(root):
    # Write your solution here
    pass

# Helper
from collections import deque
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
def createTree(arr):
    if not arr: return None
    root = TreeNode(arr[0])
    q = deque([root])
    i = 1
    while q and i < len(arr):
        node = q.popleft()
        if arr[i] is not None:
            node.left = TreeNode(arr[i])
            q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            q.append(node.right)
        i += 1
    return root

# Test cases
root1 = createTree([1,2,3,None,5,None,4])
print(rightSideView(root1))  # Expected: [1,3,4]
root2 = createTree([1,None,3])
print(rightSideView(root2))  # Expected: [1,3]
root3 = createTree([])
print(rightSideView(root3))  # Expected: []`,
      java: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public static List<Integer> rightSideView(TreeNode root) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static TreeNode createTree(Integer[] arr) {
        if (arr.length == 0) return null;
        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < arr.length) {
            TreeNode node = q.poll();
            if (arr[i] != null) {
                node.left = new TreeNode(arr[i]);
                q.offer(node.left);
            }
            i++;
            if (i < arr.length && arr[i] != null) {
                node.right = new TreeNode(arr[i]);
                q.offer(node.right);
            }
            i++;
        }
        return root;
    }
    
    public static void main(String[] args) {
        TreeNode root1 = createTree(new Integer[]{1,2,3,null,5,null,4});
        System.out.println(rightSideView(root1)); // Expected: [1,3,4]
        TreeNode root2 = createTree(new Integer[]{1,null,3});
        System.out.println(rightSideView(root2)); // Expected: [1,3]
        TreeNode root3 = createTree(new Integer[]{});
        System.out.println(rightSideView(root3)); // Expected: []
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        // Write your solution here
        
        return {};
    }
};

TreeNode* createTree(vector<int> arr) {
    if (arr.empty()) return nullptr;
    TreeNode* root = new TreeNode(arr[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < arr.size()) {
        TreeNode* node = q.front(); q.pop();
        if (arr[i] != -1) { // -1 for null
            node->left = new TreeNode(arr[i]);
            q.push(node->left);
        }
        i++;
        if (i < arr.size() && arr[i] != -1) {
            node->right = new TreeNode(arr[i]);
            q.push(node->right);
        }
        i++;
    }
    return root;
}

void printVector(const vector<int>& v) {
    cout << "[";
    for (size_t i=0; i<v.size(); ++i) {
        cout << v[i];
        if (i != v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    TreeNode* root1 = createTree({1,2,3,-1,5,-1,4}); // -1 = null
    vector<int> res1 = sol.rightSideView(root1);
    printVector(res1); // Expected: [1,3,4]
    
    TreeNode* root2 = createTree({1,-1,3});
    vector<int> res2 = sol.rightSideView(root2);
    printVector(res2); // Expected: [1,3]
    
    TreeNode* root3 = createTree({});
    vector<int> res3 = sol.rightSideView(root3);
    printVector(res3); // Expected: []
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,3,4]\n[1,3]\n[]",
      python: "[1, 3, 4]\n[1, 3]\n[]",
      java: "[1, 3, 4]\n[1, 3]\n[]",
      cpp: "[1,3,4]\n[1,3]\n[]",
    },
  },

  "kth-largest-element-in-an-array": {
    id: "kth-largest-element-in-an-array",
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    category: "Heap • Quickselect",
    description: {
      text: "Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.",
      notes: ["Can you solve it without sorting?"],
    },
    examples: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5", explanation: "Sorted order is [1,2,3,4,5,6], so 2nd largest is 5." },
      { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" },
    ],
    constraints: ["1 ≤ k ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function findKthLargest(nums, k) {
  // Write your solution here
  
}

// Test cases
console.log(findKthLargest([3,2,1,5,6,4], 2)); // Expected: 5
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // Expected: 4`,
      python: `def findKthLargest(nums, k):
    # Write your solution here
    pass

# Test cases
print(findKthLargest([3,2,1,5,6,4], 2))  # Expected: 5
print(findKthLargest([3,2,3,1,2,4,5,5,6], 4))  # Expected: 4`,
      java: `import java.util.*;

class Solution {
    public static int findKthLargest(int[] nums, int k) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(findKthLargest(new int[]{3,2,1,5,6,4}, 2)); // Expected: 5
        System.out.println(findKthLargest(new int[]{3,2,3,1,2,4,5,5,6}, 4)); // Expected: 4
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {3,2,1,5,6,4};
    cout << sol.findKthLargest(nums1, 2) << endl; // Expected: 5
    vector<int> nums2 = {3,2,3,1,2,4,5,5,6};
    cout << sol.findKthLargest(nums2, 4) << endl; // Expected: 4
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "5\n4",
      python: "5\n4",
      java: "5\n4",
      cpp: "5\n4",
    },
  },

  "spiral-matrix": {
    id: "spiral-matrix",
    title: "Spiral Matrix",
    difficulty: "Medium",
    category: "Array • Matrix",
    description: {
      text: "Given an m x n matrix, return all elements of the matrix in spiral order.",
      notes: [],
    },
    examples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" },
      { input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]", output: "[1,2,3,4,8,12,11,10,9,5,6,7]" },
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 ≤ m, n ≤ 10", "-100 ≤ matrix[i][j] ≤ 100"],
    starterCode: {
      javascript: `function spiralOrder(matrix) {
  // Write your solution here
  
}

// Test cases
console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]));      // Expected: [1,2,3,6,9,8,7,4,5]
console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]])); // Expected: [1,2,3,4,8,12,11,10,9,5,6,7]`,
      python: `def spiralOrder(matrix):
    # Write your solution here
    pass

# Test cases
print(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))       # Expected: [1,2,3,6,9,8,7,4,5]
print(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]])) # Expected: [1,2,3,4,8,12,11,10,9,5,6,7]`,
      java: `import java.util.*;

class Solution {
    public static List<Integer> spiralOrder(int[][] matrix) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(spiralOrder(new int[][]{{1,2,3},{4,5,6},{7,8,9}}));      // Expected: [1,2,3,6,9,8,7,4,5]
        System.out.println(spiralOrder(new int[][]{{1,2,3,4},{5,6,7,8},{9,10,11,12}})); // Expected: [1,2,3,4,8,12,11,10,9,5,6,7]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<int>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << v[i];
        if (i != v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<vector<int>> matrix1 = {{1,2,3},{4,5,6},{7,8,9}};
    vector<int> res1 = sol.spiralOrder(matrix1);
    printVector(res1); // Expected: [1,2,3,6,9,8,7,4,5]
    
    vector<vector<int>> matrix2 = {{1,2,3,4},{5,6,7,8},{9,10,11,12}};
    vector<int> res2 = sol.spiralOrder(matrix2);
    printVector(res2); // Expected: [1,2,3,4,8,12,11,10,9,5,6,7]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,2,3,6,9,8,7,4,5]\n[1,2,3,4,8,12,11,10,9,5,6,7]",
      python: "[1,2,3,6,9,8,7,4,5]\n[1,2,3,4,8,12,11,10,9,5,6,7]",
      java: "[1, 2, 3, 6, 9, 8, 7, 4, 5]\n[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]",
      cpp: "[1,2,3,6,9,8,7,4,5]\n[1,2,3,4,8,12,11,10,9,5,6,7]",
    },
  },

  "set-matrix-zeroes": {
    id: "set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    category: "Array • Matrix • Hash Table",
    description: {
      text: "Given an m x n integer matrix, if an element is 0, set its entire row and column to 0's. You must do it in place.",
      notes: ["A straightforward solution using O(mn) space is a bad idea. A simple improvement uses O(m + n) space. Could you devise a constant space solution?"],
    },
    examples: [
      {
        input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
        output: "[[1,0,1],[0,0,0],[1,0,1]]",
      },
      {
        input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
        output: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
      },
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[0].length",
      "1 ≤ m, n ≤ 200",
      "-2³¹ ≤ matrix[i][j] ≤ 2³¹ - 1",
    ],
    starterCode: {
      javascript: `function setZeroes(matrix) {
  // Do not return anything, modify matrix in-place instead.
  
}

// Helper to print matrix
function printMatrix(matrix) {
  console.log("[");
  for (let row of matrix) {
    console.log("  [" + row.join(",") + "]");
  }
  console.log("]");
}

// Test cases
let matrix1 = [[1,1,1],[1,0,1],[1,1,1]];
setZeroes(matrix1);
printMatrix(matrix1); // Expected: [[1,0,1],[0,0,0],[1,0,1]]

let matrix2 = [[0,1,2,0],[3,4,5,2],[1,3,1,5]];
setZeroes(matrix2);
printMatrix(matrix2); // Expected: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]`,
      python: `def setZeroes(matrix):
    # Do not return anything, modify matrix in-place instead.
    pass

# Helper
def printMatrix(matrix):
    for row in matrix:
        print("  [" + ",".join(map(str, row)) + "]")
    print()

# Test cases
matrix1 = [[1,1,1],[1,0,1],[1,1,1]]
setZeroes(matrix1)
printMatrix(matrix1) # Expected: [[1,0,1],[0,0,0],[1,0,1]]

matrix2 = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
setZeroes(matrix2)
printMatrix(matrix2) # Expected: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]`,
      java: `import java.util.*;

class Solution {
    public static void setZeroes(int[][] matrix) {
        // Write your solution here
        
    }
    
    public static void printMatrix(int[][] matrix) {
        System.out.println("[");
        for (int[] row : matrix) {
            System.out.println("  " + Arrays.toString(row));
        }
        System.out.println("]");
    }
    
    public static void main(String[] args) {
        int[][] matrix1 = {{1,1,1},{1,0,1},{1,1,1}};
        setZeroes(matrix1);
        printMatrix(matrix1); // Expected: [[1,0,1],[0,0,0],[1,0,1]]
        
        int[][] matrix2 = {{0,1,2,0},{3,4,5,2},{1,3,1,5}};
        setZeroes(matrix2);
        printMatrix(matrix2); // Expected: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        // Write your solution here
        
    }
};

void printMatrix(const vector<vector<int>>& matrix) {
    cout << "[" << endl;
    for (const auto& row : matrix) {
        cout << "  [";
        for (size_t i = 0; i < row.size(); ++i) {
            cout << row[i];
            if (i != row.size()-1) cout << ",";
        }
        cout << "]" << endl;
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<vector<int>> matrix1 = {{1,1,1},{1,0,1},{1,1,1}};
    sol.setZeroes(matrix1);
    printMatrix(matrix1); // Expected: [[1,0,1],[0,0,0],[1,0,1]]
    
    vector<vector<int>> matrix2 = {{0,1,2,0},{3,4,5,2},{1,3,1,5}};
    sol.setZeroes(matrix2);
    printMatrix(matrix2); // Expected: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[\n  [1,0,1]\n  [0,0,0]\n  [1,0,1]\n]\n[\n  [0,0,0,0]\n  [0,4,5,0]\n  [0,3,1,0]\n]",
      python: "  [1,0,1]\n  [0,0,0]\n  [1,0,1]\n\n  [0,0,0,0]\n  [0,4,5,0]\n  [0,3,1,0]\n",
      java: "[\n  [1, 0, 1]\n  [0, 0, 0]\n  [1, 0, 1]\n]\n[\n  [0, 0, 0, 0]\n  [0, 4, 5, 0]\n  [0, 3, 1, 0]\n]",
      cpp: "[\n  [1,0,1]\n  [0,0,0]\n  [1,0,1]\n]\n[\n  [0,0,0,0]\n  [0,4,5,0]\n  [0,3,1,0]\n]",
    },
  },
    "merge-intervals": {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Array • Sorting",
    description: {
      text: "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
      notes: [],
    },
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6].",
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Intervals [1,4] and [4,5] are considered overlapping.",
      },
    ],
    constraints: [
      "1 ≤ intervals.length ≤ 10⁴",
      "intervals[i].length == 2",
      "0 ≤ start_i ≤ end_i ≤ 10⁴",
    ],
    starterCode: {
      javascript: `function merge(intervals) {
  // Write your solution here
  
}

// Test cases
console.log(merge([[1,3],[2,6],[8,10],[15,18]])); // Expected: [[1,6],[8,10],[15,18]]
console.log(merge([[1,4],[4,5]]));                // Expected: [[1,5]]`,
      python: `def merge(intervals):
    # Write your solution here
    pass

# Test cases
print(merge([[1,3],[2,6],[8,10],[15,18]]))  # Expected: [[1,6],[8,10],[15,18]]
print(merge([[1,4],[4,5]]))                 # Expected: [[1,5]]`,
      java: `import java.util.*;

class Solution {
    public static int[][] merge(int[][] intervals) {
        // Write your solution here
        
        return new int[0][0];
    }
    
    public static void main(String[] args) {
        int[][] intervals1 = {{1,3},{2,6},{8,10},{15,18}};
        int[][] res1 = merge(intervals1);
        System.out.println(Arrays.deepToString(res1)); // Expected: [[1,6],[8,10],[15,18]]
        
        int[][] intervals2 = {{1,4},{4,5}};
        int[][] res2 = merge(intervals2);
        System.out.println(Arrays.deepToString(res2)); // Expected: [[1,5]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<vector<int>>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << "[" << v[i][0] << "," << v[i][1] << "]";
        if (i != v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<vector<int>> intervals1 = {{1,3},{2,6},{8,10},{15,18}};
    vector<vector<int>> res1 = sol.merge(intervals1);
    printVector(res1); // Expected: [[1,6],[8,10],[15,18]]
    
    vector<vector<int>> intervals2 = {{1,4},{4,5}};
    vector<vector<int>> res2 = sol.merge(intervals2);
    printVector(res2); // Expected: [[1,5]]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[1,6],[8,10],[15,18]]\n[[1,5]]",
      python: "[[1, 6], [8, 10], [15, 18]]\n[[1, 5]]",
      java: "[[1, 6], [8, 10], [15, 18]]\n[[1, 5]]",
      cpp: "[[1,6],[8,10],[15,18]]\n[[1,5]]",
    },
  },

  "rotting-oranges": {
    id: "rotting-oranges",
    title: "Rotting Oranges",
    difficulty: "Medium",
    category: "Graph • BFS • Matrix",
    description: {
      text: "You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.",
      notes: [],
    },
    examples: [
      {
        input: "grid = [[2,1,1],[1,1,0],[0,1,1]]",
        output: "4",
      },
      {
        input: "grid = [[2,1,1],[0,1,1],[1,0,1]]",
        output: "-1",
        explanation: "The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.",
      },
      {
        input: "grid = [[0,2]]",
        output: "0",
        explanation: "Since there are already no fresh oranges at minute 0, the answer is just 0.",
      },
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 ≤ m, n ≤ 10",
      "grid[i][j] is 0, 1, or 2.",
    ],
    starterCode: {
      javascript: `function orangesRotting(grid) {
  // Write your solution here
  
}

// Test cases
console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]])); // Expected: 4
console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]])); // Expected: -1
console.log(orangesRotting([[0,2]]));                     // Expected: 0`,
      python: `def orangesRotting(grid):
    # Write your solution here
    pass

# Test cases
print(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]))  # Expected: 4
print(orangesRotting([[2,1,1],[0,1,1],[1,0,1]]))  # Expected: -1
print(orangesRotting([[0,2]]))                      # Expected: 0`,
      java: `class Solution {
    public static int orangesRotting(int[][] grid) {
        // Write your solution here
        
        return -1;
    }
    
    public static void main(String[] args) {
        System.out.println(orangesRotting(new int[][]{{2,1,1},{1,1,0},{0,1,1}})); // Expected: 4
        System.out.println(orangesRotting(new int[][]{{2,1,1},{0,1,1},{1,0,1}})); // Expected: -1
        System.out.println(orangesRotting(new int[][]{{0,2}}));                     // Expected: 0
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        // Write your solution here
        
        return -1;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> grid1 = {{2,1,1},{1,1,0},{0,1,1}};
    cout << sol.orangesRotting(grid1) << endl; // Expected: 4

    vector<vector<int>> grid2 = {{2,1,1},{0,1,1},{1,0,1}};
    cout << sol.orangesRotting(grid2) << endl; // Expected: -1

    vector<vector<int>> grid3 = {{0,2}};
    cout << sol.orangesRotting(grid3) << endl; // Expected: 0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "4\n-1\n0",
      python: "4\n-1\n0",
      java: "4\n-1\n0",
      cpp: "4\n-1\n0",
    },
  },

  "find-all-anagrams-in-a-string": {
    id: "find-all-anagrams-in-a-string",
    title: "Find All Anagrams in a String",
    difficulty: "Medium",
    category: "String • Sliding Window • Hash Table",
    description: {
      text: "Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.",
      notes: ["An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once."],
    },
    examples: [
      {
        input: 's = "cbaebabacd", p = "abc"',
        output: "[0,6]",
        explanation: "The substring with start index = 0 is 'cba', which is an anagram of 'abc'. The substring with start index = 6 is 'bac', which is an anagram of 'abc'.",
      },
      {
        input: 's = "abab", p = "ab"',
        output: "[0,1,2]",
        explanation: "All substrings of length 2 are anagrams of 'ab'.",
      },
    ],
    constraints: [
      "1 ≤ s.length, p.length ≤ 3 * 10⁴",
      "s and p consist of lowercase English letters.",
    ],
    starterCode: {
      javascript: `function findAnagrams(s, p) {
  // Write your solution here
  
}

// Test cases
console.log(findAnagrams("cbaebabacd", "abc")); // Expected: [0,6]
console.log(findAnagrams("abab", "ab"));        // Expected: [0,1,2]`,
      python: `def findAnagrams(s, p):
    # Write your solution here
    pass

# Test cases
print(findAnagrams("cbaebabacd", "abc"))  # Expected: [0,6]
print(findAnagrams("abab", "ab"))         # Expected: [0,1,2]`,
      java: `import java.util.*;

class Solution {
    public static List<Integer> findAnagrams(String s, String p) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(findAnagrams("cbaebabacd", "abc")); // Expected: [0,6]
        System.out.println(findAnagrams("abab", "ab"));        // Expected: [0,1,2]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<int>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << v[i];
        if (i != v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<int> res1 = sol.findAnagrams("cbaebabacd", "abc");
    printVector(res1); // Expected: [0,6]

    vector<int> res2 = sol.findAnagrams("abab", "ab");
    printVector(res2); // Expected: [0,1,2]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[0,6]\n[0,1,2]",
      python: "[0, 6]\n[0, 1, 2]",
      java: "[0, 6]\n[0, 1, 2]",
      cpp: "[0,6]\n[0,1,2]",
    },
  },

  "subarray-sum-equals-k": {
    id: "subarray-sum-equals-k",
    title: "Subarray Sum Equals K",
    difficulty: "Medium",
    category: "Array • Hash Table • Prefix Sum",
    description: {
      text: "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.",
      notes: ["A subarray is a contiguous non-empty sequence of elements within the array."],
    },
    examples: [
      {
        input: "nums = [1,1,1], k = 2",
        output: "2",
      },
      {
        input: "nums = [1,2,3], k = 3",
        output: "2",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 2 * 10⁴",
      "-1000 ≤ nums[i] ≤ 1000",
      "-10⁷ ≤ k ≤ 10⁷",
    ],
    starterCode: {
      javascript: `function subarraySum(nums, k) {
  // Write your solution here
  
}

// Test cases
console.log(subarraySum([1,1,1], 2)); // Expected: 2
console.log(subarraySum([1,2,3], 3)); // Expected: 2`,
      python: `def subarraySum(nums, k):
    # Write your solution here
    pass

# Test cases
print(subarraySum([1,1,1], 2))  # Expected: 2
print(subarraySum([1,2,3], 3))  # Expected: 2`,
      java: `class Solution {
    public static int subarraySum(int[] nums, int k) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(subarraySum(new int[]{1,1,1}, 2)); // Expected: 2
        System.out.println(subarraySum(new int[]{1,2,3}, 3)); // Expected: 2
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {1,1,1};
    cout << sol.subarraySum(nums1, 2) << endl; // Expected: 2
    vector<int> nums2 = {1,2,3};
    cout << sol.subarraySum(nums2, 3) << endl; // Expected: 2
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "2\n2",
      python: "2\n2",
      java: "2\n2",
      cpp: "2\n2",
    },
  },

  "cheapest-flights-within-k-stops": {
    id: "cheapest-flights-within-k-stops",
    title: "Cheapest Flights Within K Stops",
    difficulty: "Medium",
    category: "Graph • BFS • Dijkstra",
    description: {
      text: "There are n cities connected by some number of flights. You are given an array flights where flights[i] = [from_i, to_i, price_i] indicates that there is a flight from city from_i to city to_i with cost price_i. You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.",
      notes: [],
    },
    examples: [
      {
        input: "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1",
        output: "700",
        explanation: "The optimal path with at most 1 stop from city 0 to 3 has cost 100 + 600 = 700.",
      },
      {
        input: "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1",
        output: "200",
        explanation: "The optimal path with at most 1 stop from city 0 to 2 has cost 100 + 100 = 200.",
      },
      {
        input: "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0",
        output: "500",
        explanation: "With 0 stops, you can only take the direct flight cost 500.",
      },
    ],
    constraints: [
      "1 ≤ n ≤ 100",
      "0 ≤ flights.length ≤ (n * (n - 1) / 2)",
      "flights[i].length == 3",
      "0 ≤ from_i, to_i < n",
      "from_i != to_i",
      "1 ≤ price_i ≤ 10⁴",
      "There will not be any multiple flights between two cities.",
      "0 ≤ src, dst, k < n",
      "src != dst",
    ],
    starterCode: {
      javascript: `function findCheapestPrice(n, flights, src, dst, k) {
  // Write your solution here
  
}

// Test cases
console.log(findCheapestPrice(4, [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], 0, 3, 1)); // Expected: 700
console.log(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 1));                     // Expected: 200
console.log(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 0));                     // Expected: 500`,
      python: `def findCheapestPrice(n, flights, src, dst, k):
    # Write your solution here
    pass

# Test cases
print(findCheapestPrice(4, [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], 0, 3, 1))  # Expected: 700
print(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 1))                      # Expected: 200
print(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 0))                      # Expected: 500`,
      java: `import java.util.*;

class Solution {
    public static int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        // Write your solution here
        
        return -1;
    }
    
    public static void main(String[] args) {
        System.out.println(findCheapestPrice(4, new int[][]{{0,1,100},{1,2,100},{2,0,100},{1,3,600},{2,3,200}}, 0, 3, 1)); // Expected: 700
        System.out.println(findCheapestPrice(3, new int[][]{{0,1,100},{1,2,100},{0,2,500}}, 0, 2, 1));                     // Expected: 200
        System.out.println(findCheapestPrice(3, new int[][]{{0,1,100},{1,2,100},{0,2,500}}, 0, 2, 0));                     // Expected: 500
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <climits>

using namespace std;

class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        // Write your solution here
        
        return -1;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> flights1 = {{0,1,100},{1,2,100},{2,0,100},{1,3,600},{2,3,200}};
    cout << sol.findCheapestPrice(4, flights1, 0, 3, 1) << endl; // Expected: 700

    vector<vector<int>> flights2 = {{0,1,100},{1,2,100},{0,2,500}};
    cout << sol.findCheapestPrice(3, flights2, 0, 2, 1) << endl; // Expected: 200
    cout << sol.findCheapestPrice(3, flights2, 0, 2, 0) << endl; // Expected: 500
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "700\n200\n500",
      python: "700\n200\n500",
      java: "700\n200\n500",
      cpp: "700\n200\n500",
    },
  },
    "palindrome-partitioning": {
    id: "palindrome-partitioning",
    title: "Palindrome Partitioning",
    difficulty: "Medium",
    category: "String • Backtracking",
    description: {
      text: "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.",
      notes: [],
    },
    examples: [
      {
        input: 's = "aab"',
        output: '[["a","a","b"],["aa","b"]]',
        explanation: "All partitions with palindromic substrings.",
      },
      {
        input: 's = "a"',
        output: '[["a"]]',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 16", "s contains only lowercase English letters."],
    starterCode: {
      javascript: `function partition(s) {
  // Write your solution here
  
}

// Test cases
console.log(partition("aab")); // Expected: [["a","a","b"],["aa","b"]]
console.log(partition("a"));   // Expected: [["a"]]`,
      python: `def partition(s):
    # Write your solution here
    pass

# Test cases
print(partition("aab"))  # Expected: [["a","a","b"],["aa","b"]]
print(partition("a"))    # Expected: [["a"]]`,
      java: `import java.util.*;

class Solution {
    public static List<List<String>> partition(String s) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(partition("aab")); // Expected: [["a","a","b"],["aa","b"]]
        System.out.println(partition("a"));   // Expected: [["a"]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<vector<string>> partition(string s) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<vector<string>>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << "[";
        for (size_t j = 0; j < v[i].size(); ++j) {
            cout << "\\"" << v[i][j] << "\\"";
            if (j != v[i].size()-1) cout << ",";
        }
        cout << "]";
        if (i != v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    auto res1 = sol.partition("aab");
    printVector(res1); // Expected: [["a","a","b"],["aa","b"]]

    auto res2 = sol.partition("a");
    printVector(res2); // Expected: [["a"]]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: '[["a","a","b"],["aa","b"]]\n[["a"]]',
      python: '[["a", "a", "b"], ["aa", "b"]]\n[["a"]]',
      java: '[[a, a, b], [aa, b]]\n[[a]]',
      cpp: '[["a","a","b"],["aa","b"]]\n[["a"]]',
    },
  },

  "letter-combinations-of-a-phone-number": {
    id: "letter-combinations-of-a-phone-number",
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    category: "String • Backtracking",
    description: {
      text: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order. A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.",
      notes: [],
    },
    examples: [
      {
        input: 'digits = "23"',
        output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]',
      },
      {
        input: 'digits = ""',
        output: "[]",
      },
      {
        input: 'digits = "2"',
        output: '["a","b","c"]',
      },
    ],
    constraints: ["0 ≤ digits.length ≤ 4", "digits[i] is a digit in the range ['2', '9']."],
    starterCode: {
      javascript: `function letterCombinations(digits) {
  // Write your solution here
  
}

// Test cases
console.log(letterCombinations("23")); // Expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log(letterCombinations(""));   // Expected: []
console.log(letterCombinations("2"));  // Expected: ["a","b","c"]`,
      python: `def letterCombinations(digits):
    # Write your solution here
    pass

# Test cases
print(letterCombinations("23"))  # Expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
print(letterCombinations(""))    # Expected: []
print(letterCombinations("2"))   # Expected: ["a","b","c"]`,
      java: `import java.util.*;

class Solution {
    public static List<String> letterCombinations(String digits) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(letterCombinations("23")); // Expected: [ad, ae, af, bd, be, bf, cd, ce, cf]
        System.out.println(letterCombinations(""));   // Expected: []
        System.out.println(letterCombinations("2"));  // Expected: [a, b, c]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<string> letterCombinations(string digits) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<string>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << "\\"" << v[i] << "\\"";
        if (i != v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    auto res1 = sol.letterCombinations("23");
    printVector(res1); // Expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
    auto res2 = sol.letterCombinations("");
    printVector(res2); // Expected: []
    auto res3 = sol.letterCombinations("2");
    printVector(res3); // Expected: ["a","b","c"]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: '["ad","ae","af","bd","be","bf","cd","ce","cf"]\n[]\n["a","b","c"]',
      python: '["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]\n[]\n["a", "b", "c"]',
      java: '[ad, ae, af, bd, be, bf, cd, ce, cf]\n[]\n[a, b, c]',
      cpp: '["ad","ae","af","bd","be","bf","cd","ce","cf"]\n[]\n["a","b","c"]',
    },
  },

  "sliding-window-maximum": {
    id: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    category: "Array • Queue • Sliding Window",
    description: {
      text: "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
        output: "[3,3,5,5,6,7]",
        explanation: "Window positions: [1,3,-1] -> 3, [3,-1,-3] -> 3, [-1,-3,5] -> 5, [-3,5,3] -> 5, [5,3,6] -> 6, [3,6,7] -> 7",
      },
      {
        input: "nums = [1], k = 1",
        output: "[1]",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 10⁵",
      "-10⁴ ≤ nums[i] ≤ 10⁴",
      "1 ≤ k ≤ nums.length",
    ],
    starterCode: {
      javascript: `function maxSlidingWindow(nums, k) {
  // Write your solution here
  
}

// Test cases
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // Expected: [3,3,5,5,6,7]
console.log(maxSlidingWindow([1], 1));                 // Expected: [1]`,
      python: `def maxSlidingWindow(nums, k):
    # Write your solution here
    pass

# Test cases
print(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))  # Expected: [3,3,5,5,6,7]
print(maxSlidingWindow([1], 1))                   # Expected: [1]`,
      java: `import java.util.*;

class Solution {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(maxSlidingWindow(new int[]{1,3,-1,-3,5,3,6,7}, 3))); // Expected: [3,3,5,5,6,7]
        System.out.println(Arrays.toString(maxSlidingWindow(new int[]{1}, 1)));                 // Expected: [1]
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <deque>

using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        // Write your solution here
        
        return {};
    }
};

void printVector(const vector<int>& v) {
    cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        cout << v[i];
        if (i != v.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<int> nums1 = {1,3,-1,-3,5,3,6,7};
    auto res1 = sol.maxSlidingWindow(nums1, 3);
    printVector(res1); // Expected: [3,3,5,5,6,7]

    vector<int> nums2 = {1};
    auto res2 = sol.maxSlidingWindow(nums2, 1);
    printVector(res2); // Expected: [1]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[3,3,5,5,6,7]\n[1]",
      python: "[3,3,5,5,6,7]\n[1]",
      java: "[3, 3, 5, 5, 6, 7]\n[1]",
      cpp: "[3,3,5,5,6,7]\n[1]",
    },
  },

  "basic-calculator": {
    id: "basic-calculator",
    title: "Basic Calculator",
    difficulty: "Hard",
    category: "Stack • Math • String",
    description: {
      text: "Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation. Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().",
      notes: ["The expression string may contain open '(' and closing ')', the plus '+' or minus sign '-', non-negative integers and empty spaces ' '. You may assume that the given expression is always valid. Do not use the eval built-in library function."],
    },
    examples: [
      {
        input: 's = "1 + 1"',
        output: "2",
      },
      {
        input: 's = " 2-1 + 2 "',
        output: "3",
      },
      {
        input: 's = "(1+(4+5+2)-3)+(6+8)"',
        output: "23",
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 3 * 10⁵",
      "s consists of digits, '+', '-', '(', ')', and ' '.",
      "s represents a valid expression.",
      "'+' is not used as a unary operation (i.e., '+1' and '+(2 + 3)' is invalid).",
      "'-' could be used as a unary operation (i.e., '-1' and '-(2 + 3)' is valid).",
      "There will be no two consecutive operators in the input.",
      "Every number and running calculation will fit in a signed 32-bit integer.",
    ],
    starterCode: {
      javascript: `function calculate(s) {
  // Write your solution here
  
}

// Test cases
console.log(calculate("1 + 1"));               // Expected: 2
console.log(calculate(" 2-1 + 2 "));           // Expected: 3
console.log(calculate("(1+(4+5+2)-3)+(6+8)")); // Expected: 23`,
      python: `def calculate(s):
    # Write your solution here
    pass

# Test cases
print(calculate("1 + 1"))                # Expected: 2
print(calculate(" 2-1 + 2 "))            # Expected: 3
print(calculate("(1+(4+5+2)-3)+(6+8)"))  # Expected: 23`,
      java: `class Solution {
    public static int calculate(String s) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(calculate("1 + 1"));               // Expected: 2
        System.out.println(calculate(" 2-1 + 2 "));           // Expected: 3
        System.out.println(calculate("(1+(4+5+2)-3)+(6+8)")); // Expected: 23
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <stack>

using namespace std;

class Solution {
public:
    int calculate(string s) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    cout << sol.calculate("1 + 1") << endl;               // Expected: 2
    cout << sol.calculate(" 2-1 + 2 ") << endl;           // Expected: 3
    cout << sol.calculate("(1+(4+5+2)-3)+(6+8)") << endl; // Expected: 23
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "2\n3\n23",
      python: "2\n3\n23",
      java: "2\n3\n23",
      cpp: "2\n3\n23",
    },
  },

  "maximal-square": {
    id: "maximal-square",
    title: "Maximal Square",
    difficulty: "Medium",
    category: "Matrix • Dynamic Programming",
    description: {
      text: "Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.",
      notes: [],
    },
    examples: [
      {
        input: `matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]`,
        output: "4",
      },
      {
        input: `matrix = [["0","1"],["1","0"]]`,
        output: "1",
      },
      {
        input: `matrix = [["0"]]`,
        output: "0",
      },
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 ≤ m, n ≤ 300",
      "matrix[i][j] is '0' or '1'.",
    ],
    starterCode: {
      javascript: `function maximalSquare(matrix) {
  // Write your solution here
  
}

// Test cases
let matrix1 = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]];
console.log(maximalSquare(matrix1)); // Expected: 4

let matrix2 = [["0","1"],["1","0"]];
console.log(maximalSquare(matrix2)); // Expected: 1

let matrix3 = [["0"]];
console.log(maximalSquare(matrix3)); // Expected: 0`,
      python: `def maximalSquare(matrix):
    # Write your solution here
    pass

# Test cases
matrix1 = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
print(maximalSquare(matrix1))  # Expected: 4

matrix2 = [["0","1"],["1","0"]]
print(maximalSquare(matrix2))  # Expected: 1

matrix3 = [["0"]]
print(maximalSquare(matrix3))  # Expected: 0`,
      java: `class Solution {
    public static int maximalSquare(char[][] matrix) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        char[][] matrix1 = {{'1','0','1','0','0'},{'1','0','1','1','1'},{'1','1','1','1','1'},{'1','0','0','1','0'}};
        System.out.println(maximalSquare(matrix1)); // Expected: 4
        
        char[][] matrix2 = {{'0','1'},{'1','0'}};
        System.out.println(maximalSquare(matrix2)); // Expected: 1
        
        char[][] matrix3 = {{'0'}};
        System.out.println(maximalSquare(matrix3)); // Expected: 0
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<vector<char>> matrix1 = {{'1','0','1','0','0'},{'1','0','1','1','1'},{'1','1','1','1','1'},{'1','0','0','1','0'}};
    cout << sol.maximalSquare(matrix1) << endl; // Expected: 4

    vector<vector<char>> matrix2 = {{'0','1'},{'1','0'}};
    cout << sol.maximalSquare(matrix2) << endl; // Expected: 1

    vector<vector<char>> matrix3 = {{'0'}};
    cout << sol.maximalSquare(matrix3) << endl; // Expected: 0
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "4\n1\n0",
      python: "4\n1\n0",
      java: "4\n1\n0",
      cpp: "4\n1\n0",
    },
  },
    "koko-eating-bananas": {
    id: "koko-eating-bananas",
    title: "Koko Eating Bananas",
    difficulty: "Medium",
    category: "Array • Binary Search",
    description: {
      text: "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour. Koko likes to finish eating all the bananas within h hours. Return the minimum integer k such that she can eat all the bananas within h hours.",
      notes: [],
    },
    examples: [
      {
        input: "piles = [3,6,7,11], h = 8",
        output: "4",
      },
      {
        input: "piles = [30,11,23,4,20], h = 5",
        output: "30",
      },
      {
        input: "piles = [30,11,23,4,20], h = 6",
        output: "23",
      },
    ],
    constraints: [
      "1 ≤ piles.length ≤ 10⁴",
      "piles.length ≤ h ≤ 10⁹",
      "1 ≤ piles[i] ≤ 10⁹",
    ],
    starterCode: {
      javascript: `function minEatingSpeed(piles, h) {
  // Write your solution here
  
}

// Test cases
console.log(minEatingSpeed([3,6,7,11], 8));          // Expected: 4
console.log(minEatingSpeed([30,11,23,4,20], 5));    // Expected: 30
console.log(minEatingSpeed([30,11,23,4,20], 6));    // Expected: 23`,
      python: `def minEatingSpeed(piles, h):
    # Write your solution here
    pass

# Test cases
print(minEatingSpeed([3,6,7,11], 8))           # Expected: 4
print(minEatingSpeed([30,11,23,4,20], 5))      # Expected: 30
print(minEatingSpeed([30,11,23,4,20], 6))      # Expected: 23`,
      java: `class Solution {
    public static int minEatingSpeed(int[] piles, int h) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(minEatingSpeed(new int[]{3,6,7,11}, 8));         // Expected: 4
        System.out.println(minEatingSpeed(new int[]{30,11,23,4,20}, 5));   // Expected: 30
        System.out.println(minEatingSpeed(new int[]{30,11,23,4,20}, 6));   // Expected: 23
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> piles1 = {3,6,7,11};
    cout << sol.minEatingSpeed(piles1, 8) << endl; // Expected: 4

    vector<int> piles2 = {30,11,23,4,20};
    cout << sol.minEatingSpeed(piles2, 5) << endl; // Expected: 30
    cout << sol.minEatingSpeed(piles2, 6) << endl; // Expected: 23
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "4\n30\n23",
      python: "4\n30\n23",
      java: "4\n30\n23",
      cpp: "4\n30\n23",
    },
  },

  "search-a-2d-matrix": {
    id: "search-a-2d-matrix",
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    category: "Matrix • Binary Search",
    description: {
      text: "You are given an m x n integer matrix matrix with the following two properties: Each row is sorted in non-decreasing order. The first integer of each row is greater than the last integer of the previous row. Given an integer target, return true if target is in matrix or false otherwise.",
      notes: ["You must write a solution in O(log(m * n)) time complexity."],
    },
    examples: [
      {
        input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
        output: "true",
      },
      {
        input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",
        output: "false",
      },
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 ≤ m, n ≤ 100",
      "-10⁴ ≤ matrix[i][j], target ≤ 10⁴",
    ],
    starterCode: {
      javascript: `function searchMatrix(matrix, target) {
  // Write your solution here
  
}

// Test cases
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3));  // Expected: true
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13)); // Expected: false`,
      python: `def searchMatrix(matrix, target):
    # Write your solution here
    pass

# Test cases
print(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3))   # Expected: True
print(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13))  # Expected: False`,
      java: `class Solution {
    public static boolean searchMatrix(int[][] matrix, int target) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        int[][] matrix = {{1,3,5,7},{10,11,16,20},{23,30,34,60}};
        System.out.println(searchMatrix(matrix, 3));   // Expected: true
        System.out.println(searchMatrix(matrix, 13));  // Expected: false
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        // Write your solution here
        
        return false;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> matrix = {{1,3,5,7},{10,11,16,20},{23,30,34,60}};
    cout << (sol.searchMatrix(matrix, 3) ? "true" : "false") << endl;  // Expected: true
    cout << (sol.searchMatrix(matrix, 13) ? "true" : "false") << endl; // Expected: false
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
      cpp: "true\nfalse",
    },
  },

  "copy-list-with-random-pointer": {
    id: "copy-list-with-random-pointer",
    title: "Copy List with Random Pointer",
    difficulty: "Medium",
    category: "Linked List • Hash Table",
    description: {
      text: "A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.",
      notes: ["Return the head of the copied linked list."],
    },
    examples: [
      {
        input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
        output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
      },
      {
        input: "head = [[1,1],[2,1]]",
        output: "[[1,1],[2,1]]",
      },
      {
        input: "head = []",
        output: "[]",
      },
    ],
    constraints: [
      "0 ≤ n ≤ 1000",
      "-10⁴ ≤ Node.val ≤ 10⁴",
      "Node.random is null or is pointing to some node in the linked list.",
    ],
    starterCode: {
      javascript: `// Definition for a Node.
function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
}

function copyRandomList(head) {
  // Write your solution here
  
}

// Helper to create list from array
function createList(arr) {
  if (arr.length === 0) return null;
  let nodes = arr.map(([val]) => new Node(val));
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].next = (i + 1 < nodes.length) ? nodes[i+1] : null;
    let randomIdx = arr[i][1];
    nodes[i].random = (randomIdx !== null) ? nodes[randomIdx] : null;
  }
  return nodes[0];
}

// Helper to print list as array
function printList(head) {
  let res = [];
  let map = new Map();
  let curr = head;
  let idx = 0;
  while (curr) { map.set(curr, idx++); curr = curr.next; }
  curr = head;
  while (curr) {
    let randIdx = curr.random ? map.get(curr.random) : null;
    res.push([curr.val, randIdx]);
    curr = curr.next;
  }
  console.log(JSON.stringify(res));
}

// Test cases
let head1 = createList([[7,null],[13,0],[11,4],[10,2],[1,0]]);
let copy1 = copyRandomList(head1);
printList(copy1); // Expected: [[7,null],[13,0],[11,4],[10,2],[1,0]]

let head2 = createList([[1,1],[2,1]]);
let copy2 = copyRandomList(head2);
printList(copy2); // Expected: [[1,1],[2,1]]

let head3 = createList([]);
let copy3 = copyRandomList(head3);
printList(copy3); // Expected: []`,
      python: `# Definition for a Node.
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = x
        self.next = next
        self.random = random

def copyRandomList(head):
    # Write your solution here
    pass

# Helper functions
def createList(arr):
    if not arr: return None
    nodes = [Node(val) for val, _ in arr]
    for i, (_, rand) in enumerate(arr):
        if i+1 < len(nodes): nodes[i].next = nodes[i+1]
        nodes[i].random = nodes[rand] if rand is not None else None
    return nodes[0]

def printList(head):
    res = []
    curr = head
    idx = 0
    nodemap = {}
    while curr:
        nodemap[curr] = idx
        idx += 1
        curr = curr.next
    curr = head
    while curr:
        rand = curr.random
        res.append([curr.val, nodemap[rand] if rand else None])
        curr = curr.next
    print(str(res).replace(" ", ""))

# Test cases
head1 = createList([[7,None],[13,0],[11,4],[10,2],[1,0]])
copy1 = copyRandomList(head1)
printList(copy1)  # Expected: [[7,None],[13,0],[11,4],[10,2],[1,0]]

head2 = createList([[1,1],[2,1]])
copy2 = copyRandomList(head2)
printList(copy2)  # Expected: [[1,1],[2,1]]

head3 = createList([])
copy3 = copyRandomList(head3)
printList(copy3)  # Expected: []`,
      java: `import java.util.*;

class Node {
    int val;
    Node next;
    Node random;
    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}

class Solution {
    public static Node copyRandomList(Node head) {
        // Write your solution here
        
        return null;
    }
    
    public static Node createList(int[][] arr) {
        if (arr.length == 0) return null;
        Node[] nodes = new Node[arr.length];
        for (int i = 0; i < arr.length; i++) nodes[i] = new Node(arr[i][0]);
        for (int i = 0; i < arr.length; i++) {
            if (i+1 < arr.length) nodes[i].next = nodes[i+1];
            int randIdx = arr[i][1];
            nodes[i].random = (randIdx != -1) ? nodes[randIdx] : null;
        }
        return nodes[0];
    }
    
    public static void printList(Node head) {
        List<List<Integer>> res = new ArrayList<>();
        Map<Node, Integer> map = new HashMap<>();
        Node curr = head;
        int idx = 0;
        while (curr != null) { map.put(curr, idx++); curr = curr.next; }
        curr = head;
        while (curr != null) {
            Integer randIdx = curr.random != null ? map.get(curr.random) : null;
            res.add(Arrays.asList(curr.val, randIdx));
            curr = curr.next;
        }
        System.out.println(res.toString().replace(" ", ""));
    }
    
    public static void main(String[] args) {
        Node head1 = createList(new int[][]{{7,-1},{13,0},{11,4},{10,2},{1,0}}); // -1 = null
        Node copy1 = copyRandomList(head1);
        printList(copy1); // Expected: [[7,null],[13,0],[11,4],[10,2],[1,0]]
        
        Node head2 = createList(new int[][]{{1,1},{2,1}});
        Node copy2 = copyRandomList(head2);
        printList(copy2); // Expected: [[1,1],[2,1]]
        
        Node head3 = createList(new int[][]{});
        Node copy3 = copyRandomList(head3);
        printList(copy3); // Expected: []
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

class Node {
public:
    int val;
    Node* next;
    Node* random;
    Node(int _val) {
        val = _val;
        next = NULL;
        random = NULL;
    }
};

class Solution {
public:
    Node* copyRandomList(Node* head) {
        // Write your solution here
        
        return nullptr;
    }
};

Node* createList(vector<vector<int>> arr) {
    if (arr.empty()) return nullptr;
    vector<Node*> nodes(arr.size());
    for (size_t i = 0; i < arr.size(); i++) nodes[i] = new Node(arr[i][0]);
    for (size_t i = 0; i < arr.size(); i++) {
        if (i+1 < arr.size()) nodes[i]->next = nodes[i+1];
        int randIdx = arr[i][1];
        nodes[i]->random = (randIdx != -1) ? nodes[randIdx] : nullptr;
    }
    return nodes[0];
}

void printList(Node* head) {
    vector<vector<int>> res;
    unordered_map<Node*, int> idxMap;
    Node* curr = head;
    int idx = 0;
    while (curr) { idxMap[curr] = idx++; curr = curr->next; }
    curr = head;
    while (curr) {
        int randIdx = curr->random ? idxMap[curr->random] : -1;
        res.push_back({curr->val, randIdx});
        curr = curr->next;
    }
    cout << "[";
    for (size_t i = 0; i < res.size(); ++i) {
        cout << "[" << res[i][0] << "," << (res[i][1] == -1 ? "null" : to_string(res[i][1])) << "]";
        if (i != res.size()-1) cout << ",";
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    Node* head1 = createList({{7,-1},{13,0},{11,4},{10,2},{1,0}}); // -1 = null
    Node* copy1 = sol.copyRandomList(head1);
    printList(copy1); // Expected: [[7,null],[13,0],[11,4],[10,2],[1,0]]
    
    Node* head2 = createList({{1,1},{2,1}});
    Node* copy2 = sol.copyRandomList(head2);
    printList(copy2); // Expected: [[1,1],[2,1]]
    
    Node* head3 = createList({});
    Node* copy3 = sol.copyRandomList(head3);
    printList(copy3); // Expected: []
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[7,null],[13,0],[11,4],[10,2],[1,0]]\n[[1,1],[2,1]]\n[]",
      python: "[[7,None],[13,0],[11,4],[10,2],[1,0]]\n[[1,1],[2,1]]\n[]",
      java: "[[7,null],[13,0],[11,4],[10,2],[1,0]]\n[[1,1],[2,1]]\n[]",
      cpp: "[[7,null],[13,0],[11,4],[10,2],[1,0]]\n[[1,1],[2,1]]\n[]",
    },
  },

  "find-the-duplicate-number": {
    id: "find-the-duplicate-number",
    title: "Find the Duplicate Number",
    difficulty: "Medium",
    category: "Array • Two Pointers • Floyd's Cycle Detection",
    description: {
      text: "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number. You must solve the problem without modifying the array nums and uses only constant extra space.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [1,3,4,2,2]",
        output: "2",
      },
      {
        input: "nums = [3,1,3,4,2]",
        output: "3",
      },
      {
        input: "nums = [3,3,3,3,3]",
        output: "3",
      },
    ],
    constraints: [
      "1 ≤ n ≤ 10⁵",
      "nums.length == n + 1",
      "1 ≤ nums[i] ≤ n",
      "All the integers in nums appear only once except for precisely one integer which appears two or more times.",
    ],
    starterCode: {
      javascript: `function findDuplicate(nums) {
  // Write your solution here
  
}

// Test cases
console.log(findDuplicate([1,3,4,2,2]));     // Expected: 2
console.log(findDuplicate([3,1,3,4,2]));    // Expected: 3
console.log(findDuplicate([3,3,3,3,3]));    // Expected: 3`,
      python: `def findDuplicate(nums):
    # Write your solution here
    pass

# Test cases
print(findDuplicate([1,3,4,2,2]))    # Expected: 2
print(findDuplicate([3,1,3,4,2]))   # Expected: 3
print(findDuplicate([3,3,3,3,3]))   # Expected: 3`,
      java: `class Solution {
    public static int findDuplicate(int[] nums) {
        // Write your solution here
        
        return -1;
    }
    
    public static void main(String[] args) {
        System.out.println(findDuplicate(new int[]{1,3,4,2,2}));     // Expected: 2
        System.out.println(findDuplicate(new int[]{3,1,3,4,2}));    // Expected: 3
        System.out.println(findDuplicate(new int[]{3,3,3,3,3}));    // Expected: 3
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        // Write your solution here
        
        return -1;
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {1,3,4,2,2};
    cout << sol.findDuplicate(nums1) << endl; // Expected: 2

    vector<int> nums2 = {3,1,3,4,2};
    cout << sol.findDuplicate(nums2) << endl; // Expected: 3

    vector<int> nums3 = {3,3,3,3,3};
    cout << sol.findDuplicate(nums3) << endl; // Expected: 3
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "2\n3\n3",
      python: "2\n3\n3",
      java: "2\n3\n3",
      cpp: "2\n3\n3",
    },
  },

  "jump-game-ii": {
    id: "jump-game-ii",
    title: "Jump Game II",
    difficulty: "Medium",
    category: "Array • Greedy • Dynamic Programming",
    description: {
      text: "You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0]. Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where 0 <= j <= nums[i] and i + j < n. Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].",
      notes: [],
    },
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "2",
        explanation: "The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.",
      },
      {
        input: "nums = [2,3,0,1,4]",
        output: "2",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 10⁴",
      "0 ≤ nums[i] ≤ 1000",
      "It's guaranteed that you can reach nums[n - 1].",
    ],
    starterCode: {
      javascript: `function jump(nums) {
  // Write your solution here
  
}

// Test cases
console.log(jump([2,3,1,1,4]));   // Expected: 2
console.log(jump([2,3,0,1,4]));   // Expected: 2`,
      python: `def jump(nums):
    # Write your solution here
    pass

# Test cases
print(jump([2,3,1,1,4]))   # Expected: 2
print(jump([2,3,0,1,4]))   # Expected: 2`,
      java: `class Solution {
    public static int jump(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(jump(new int[]{2,3,1,1,4})); // Expected: 2
        System.out.println(jump(new int[]{2,3,0,1,4})); // Expected: 2
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int jump(vector<int>& nums) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {2,3,1,1,4};
    cout << sol.jump(nums1) << endl; // Expected: 2
    vector<int> nums2 = {2,3,0,1,4};
    cout << sol.jump(nums2) << endl; // Expected: 2
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "2\n2",
      python: "2\n2",
      java: "2\n2",
      cpp: "2\n2",
    },
  },
    "number-of-provinces": {
    id: "number-of-provinces",
    title: "Number of Provinces",
    difficulty: "Medium",
    category: "Graph • Union Find • DFS",
    description: {
      text: "There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c. A province is a group of directly or indirectly connected cities and no other cities outside of the group. You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise. Return the total number of provinces.",
      notes: [],
    },
    examples: [
      {
        input: "isConnected = [[1,1,0],[1,1,0],[0,0,1]]",
        output: "2",
      },
      {
        input: "isConnected = [[1,0,0],[0,1,0],[0,0,1]]",
        output: "3",
      },
    ],
    constraints: [
      "1 ≤ n ≤ 200",
      "n == isConnected.length",
      "n == isConnected[i].length",
      "isConnected[i][j] is 1 or 0.",
      "isConnected[i][i] == 1",
      "isConnected[i][j] == isConnected[j][i]",
    ],
    starterCode: {
      javascript: `function findCircleNum(isConnected) {
  // Write your solution here
  
}

// Test cases
console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]])); // Expected: 2
console.log(findCircleNum([[1,0,0],[0,1,0],[0,0,1]])); // Expected: 3`,
      python: `def findCircleNum(isConnected):
    # Write your solution here
    pass

# Test cases
print(findCircleNum([[1,1,0],[1,1,0],[0,0,1]]))  # Expected: 2
print(findCircleNum([[1,0,0],[0,1,0],[0,0,1]]))  # Expected: 3`,
      java: `class Solution {
    public static int findCircleNum(int[][] isConnected) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(findCircleNum(new int[][]{{1,1,0},{1,1,0},{0,0,1}})); // Expected: 2
        System.out.println(findCircleNum(new int[][]{{1,0,0},{0,1,0},{0,0,1}})); // Expected: 3
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> grid1 = {{1,1,0},{1,1,0},{0,0,1}};
    cout << sol.findCircleNum(grid1) << endl; // Expected: 2

    vector<vector<int>> grid2 = {{1,0,0},{0,1,0},{0,0,1}};
    cout << sol.findCircleNum(grid2) << endl; // Expected: 3
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "2\n3",
      python: "2\n3",
      java: "2\n3",
      cpp: "2\n3",
    },
  },

  "network-delay-time": {
    id: "network-delay-time",
    title: "Network Delay Time",
    difficulty: "Medium",
    category: "Graph • Dijkstra • Heap",
    description: {
      text: "You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target. We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.",
      notes: [],
    },
    examples: [
      {
        input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
        output: "2",
      },
      {
        input: "times = [[1,2,1]], n = 2, k = 1",
        output: "1",
      },
      {
        input: "times = [[1,2,1]], n = 2, k = 2",
        output: "-1",
      },
    ],
    constraints: [
      "1 ≤ k ≤ n ≤ 100",
      "1 ≤ times.length ≤ 6000",
      "times[i].length == 3",
      "1 ≤ ui, vi ≤ n",
      "ui != vi",
      "0 ≤ wi ≤ 100",
      "All the pairs (ui, vi) are unique. (i.e., no multiple edges.)",
    ],
    starterCode: {
      javascript: `function networkDelayTime(times, n, k) {
  // Write your solution here
  
}

// Test cases
console.log(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)); // Expected: 2
console.log(networkDelayTime([[1,2,1]], 2, 1));                  // Expected: 1
console.log(networkDelayTime([[1,2,1]], 2, 2));                  // Expected: -1`,
      python: `def networkDelayTime(times, n, k):
    # Write your solution here
    pass

# Test cases
print(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2))  # Expected: 2
print(networkDelayTime([[1,2,1]], 2, 1))                   # Expected: 1
print(networkDelayTime([[1,2,1]], 2, 2))                   # Expected: -1`,
      java: `import java.util.*;

class Solution {
    public static int networkDelayTime(int[][] times, int n, int k) {
        // Write your solution here
        
        return -1;
    }
    
    public static void main(String[] args) {
        System.out.println(networkDelayTime(new int[][]{{2,1,1},{2,3,1},{3,4,1}}, 4, 2)); // Expected: 2
        System.out.println(networkDelayTime(new int[][]{{1,2,1}}, 2, 1));                  // Expected: 1
        System.out.println(networkDelayTime(new int[][]{{1,2,1}}, 2, 2));                  // Expected: -1
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>

using namespace std;

class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        // Write your solution here
        
        return -1;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> times1 = {{2,1,1},{2,3,1},{3,4,1}};
    cout << sol.networkDelayTime(times1, 4, 2) << endl; // Expected: 2

    vector<vector<int>> times2 = {{1,2,1}};
    cout << sol.networkDelayTime(times2, 2, 1) << endl; // Expected: 1
    cout << sol.networkDelayTime(times2, 2, 2) << endl; // Expected: -1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "2\n1\n-1",
      python: "2\n1\n-1",
      java: "2\n1\n-1",
      cpp: "2\n1\n-1",
    },
  },

  "reorganize-string": {
    id: "reorganize-string",
    title: "Reorganize String",
    difficulty: "Medium",
    category: "String • Heap • Greedy",
    description: {
      text: "Given a string s, rearrange the characters of s so that any two adjacent characters are not the same. Return any possible rearrangement of s or return '' if not possible.",
      notes: [],
    },
    examples: [
      {
        input: 's = "aab"',
        output: '"aba"',
      },
      {
        input: 's = "aaab"',
        output: '""',
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 500",
      "s consists of lowercase English letters.",
    ],
    starterCode: {
      javascript: `function reorganizeString(s) {
  // Write your solution here
  
}

// Test cases
console.log(reorganizeString("aab"));   // Expected: "aba"
console.log(reorganizeString("aaab"));  // Expected: ""`,
      python: `def reorganizeString(s):
    # Write your solution here
    pass

# Test cases
print(reorganizeString("aab"))   # Expected: "aba"
print(reorganizeString("aaab"))  # Expected: ""`,
      java: `class Solution {
    public static String reorganizeString(String s) {
        // Write your solution here
        
        return "";
    }
    
    public static void main(String[] args) {
        System.out.println(reorganizeString("aab"));   // Expected: "aba"
        System.out.println(reorganizeString("aaab"));  // Expected: ""
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <queue>
#include <vector>

using namespace std;

class Solution {
public:
    string reorganizeString(string s) {
        // Write your solution here
        
        return "";
    }
};

int main() {
    Solution sol;
    cout << sol.reorganizeString("aab") << endl;  // Expected: "aba"
    cout << sol.reorganizeString("aaab") << endl; // Expected: ""
    return 0;
}`,
    },
    expectedOutput: {
      javascript: '"aba"\n""',
      python: '"aba"\n""',
      java: 'aba\n',
      cpp: 'aba\n',
    },
  },

  "task-scheduler": {
    id: "task-scheduler",
    title: "Task Scheduler",
    difficulty: "Medium",
    category: "Greedy • Heap • Array",
    description: {
      text: "Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle. There is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks. Return the least number of units of times that the CPU will take to finish all the given tasks.",
      notes: [],
    },
    examples: [
      {
        input: 'tasks = ["A","A","A","B","B","B"], n = 2',
        output: "8",
        explanation: "A -> B -> idle -> A -> B -> idle -> A -> B. So 8 units of time.",
      },
      {
        input: 'tasks = ["A","A","A","B","B","B"], n = 0',
        output: "6",
      },
      {
        input: 'tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2',
        output: "16",
      },
    ],
    constraints: [
      "1 ≤ task.length ≤ 10⁴",
      "tasks[i] is upper-case English letter.",
      "0 ≤ n ≤ 100",
    ],
    starterCode: {
      javascript: `function leastInterval(tasks, n) {
  // Write your solution here
  
}

// Test cases
console.log(leastInterval(["A","A","A","B","B","B"], 2)); // Expected: 8
console.log(leastInterval(["A","A","A","B","B","B"], 0)); // Expected: 6
console.log(leastInterval(["A","A","A","A","A","A","B","C","D","E","F","G"], 2)); // Expected: 16`,
      python: `def leastInterval(tasks, n):
    # Write your solution here
    pass

# Test cases
print(leastInterval(["A","A","A","B","B","B"], 2))  # Expected: 8
print(leastInterval(["A","A","A","B","B","B"], 0))  # Expected: 6
print(leastInterval(["A","A","A","A","A","A","B","C","D","E","F","G"], 2))  # Expected: 16`,
      java: `import java.util.*;

class Solution {
    public static int leastInterval(char[] tasks, int n) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(leastInterval(new char[]{'A','A','A','B','B','B'}, 2)); // Expected: 8
        System.out.println(leastInterval(new char[]{'A','A','A','B','B','B'}, 0)); // Expected: 6
        System.out.println(leastInterval(new char[]{'A','A','A','A','A','A','B','C','D','E','F','G'}, 2)); // Expected: 16
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        // Write your solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    vector<char> tasks1 = {'A','A','A','B','B','B'};
    cout << sol.leastInterval(tasks1, 2) << endl; // Expected: 8
    cout << sol.leastInterval(tasks1, 0) << endl; // Expected: 6

    vector<char> tasks2 = {'A','A','A','A','A','A','B','C','D','E','F','G'};
    cout << sol.leastInterval(tasks2, 2) << endl; // Expected: 16
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "8\n6\n16",
      python: "8\n6\n16",
      java: "8\n6\n16",
      cpp: "8\n6\n16",
    },
  },

  "surrounded-regions": {
    id: "surrounded-regions",
    title: "Surrounded Regions",
    difficulty: "Medium",
    category: "Matrix • DFS • BFS",
    description: {
      text: "Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'. A region is captured by flipping all 'O's into 'X's in that surrounded region.",
      notes: [],
    },
    examples: [
      {
        input: `board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]`,
        output: `[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]`,
        explanation: "The bottom 'O' is on the border, so it is not flipped. The other 'O's are flipped.",
      },
      {
        input: `board = [["X"]]`,
        output: `[["X"]]`,
      },
    ],
    constraints: [
      "m == board.length",
      "n == board[i].length",
      "1 ≤ m, n ≤ 200",
      "board[i][j] is 'X' or 'O'.",
    ],
    starterCode: {
      javascript: `function solve(board) {
  // Do not return anything, modify board in-place instead.
  
}

// Helper to print board
function printBoard(board) {
  console.log("[");
  for (let row of board) {
    console.log('  ["' + row.join('","') + '"]');
  }
  console.log("]");
}

// Test cases
let board1 = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
solve(board1);
printBoard(board1); // Expected: all 'O' flipped except border ones

let board2 = [["X"]];
solve(board2);
printBoard(board2); // Expected: [["X"]]`,
      python: `def solve(board):
    # Do not return anything, modify board in-place instead.
    pass

# Helper
def printBoard(board):
    for row in board:
        print('  ["' + '","'.join(row) + '"]')
    print()

# Test cases
board1 = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
solve(board1)
printBoard(board1)  # Expected: all 'O' flipped except border ones

board2 = [["X"]]
solve(board2)
printBoard(board2)  # Expected: [["X"]]`,
      java: `import java.util.*;

class Solution {
    public static void solve(char[][] board) {
        // Write your solution here
        
    }
    
    public static void printBoard(char[][] board) {
        System.out.println("[");
        for (char[] row : board) {
            System.out.print("  [");
            for (int i = 0; i < row.length; i++) {
                System.out.print('"' + String.valueOf(row[i]) + '"');
                if (i != row.length-1) System.out.print(",");
            }
            System.out.println("]");
        }
        System.out.println("]");
    }
    
    public static void main(String[] args) {
        char[][] board1 = {{'X','X','X','X'},{'X','O','O','X'},{'X','X','O','X'},{'X','O','X','X'}};
        solve(board1);
        printBoard(board1); // Expected: all 'O' flipped except border ones
        
        char[][] board2 = {{'X'}};
        solve(board2);
        printBoard(board2); // Expected: [["X"]]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    void solve(vector<vector<char>>& board) {
        // Write your solution here
        
    }
};

void printBoard(const vector<vector<char>>& board) {
    cout << "[" << endl;
    for (const auto& row : board) {
        cout << "  [";
        for (size_t i = 0; i < row.size(); ++i) {
            cout << '"' << row[i] << '"';
            if (i != row.size()-1) cout << ",";
        }
        cout << "]" << endl;
    }
    cout << "]" << endl;
}

int main() {
    Solution sol;
    vector<vector<char>> board1 = {{'X','X','X','X'},{'X','O','O','X'},{'X','X','O','X'},{'X','O','X','X'}};
    sol.solve(board1);
    printBoard(board1); // Expected: all 'O' flipped except border ones

    vector<vector<char>> board2 = {{'X'}};
    sol.solve(board2);
    printBoard(board2); // Expected: [["X"]]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: `[\n  ["X","X","X","X"]\n  ["X","X","X","X"]\n  ["X","X","X","X"]\n  ["X","O","X","X"]\n]\n[\n  ["X"]\n]`,
      python: '  ["X","X","X","X"]\n  ["X","X","X","X"]\n  ["X","X","X","X"]\n  ["X","O","X","X"]\n\n  ["X"]\n',
      java: '[\n  ["X","X","X","X"]\n  ["X","X","X","X"]\n  ["X","X","X","X"]\n  ["X","O","X","X"]\n]\n[\n  ["X"]\n]',
      cpp: '[\n  ["X","X","X","X"]\n  ["X","X","X","X"]\n  ["X","X","X","X"]\n  ["X","O","X","X"]\n]\n[\n  ["X"]\n]',
    },
  },
};
export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
  cpp: {
    name: "C++",
    icon: "/cpp.png",
    monacoLang: "cpp",
  },
};