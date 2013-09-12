// Generated by CoffeeScript 1.3.3
(function() {

  (function() {
    var $, allScripts, buildWidget, dict, expandIssue, i, initjQuery, jqueryPath, jqueryVersion, loadCss, loadIssues, loadScript, main, name, postIssue, removeListeners, renderForm, renderIssues, script, scriptName, scriptTag, targetScripts, _i, _len;
    $ = null;
    scriptName = "embed.js";
    jqueryPath = "http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js";
    jqueryVersion = "1.8.3";
    dict = {};
    allScripts = document.getElementsByTagName('script');
    targetScripts = [];
    for (i = _i = 0, _len = allScripts.length; _i < _len; i = ++_i) {
      script = allScripts[i];
      name = allScripts[i].src;
      if (name && name.indexOf(scriptName) > 0) {
        targetScripts.push(allScripts[i]);
      }
    }
    scriptTag = targetScripts[targetScripts.length - 1];
    loadScript = function(src, onLoad) {
      var script_tag;
      script_tag = document.createElement('script');
      script_tag.setAttribute("type", "text/javascript");
      script_tag.setAttribute("src", src);
      if (script_tag.readyState) {
        script_tag.onreadystatechange = function() {
          if (this.readyState === 'complete' || this.readyState === 'loaded') {
            return onLoad();
          }
        };
      } else {
        script_tag.onload = onLoad;
      }
      return (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    };
    loadCss = function(href) {
      var link_tag;
      link_tag = document.createElement('link');
      link_tag.setAttribute("type", "text/css");
      link_tag.setAttribute("rel", "stylesheet");
      link_tag.setAttribute("href", href);
      return (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(link_tag);
    };
    initjQuery = function() {
      var jQuery;
      $ = jQuery = window.jQuery.noConflict(true);
      return main();
    };
    if (window.jQuery === void 0 || window.jQuery.fn.jquery !== jqueryVersion) {
      loadScript(jqueryPath, initjQuery);
    } else {
      initjQuery();
    }
    main = function() {
      loadCss("../static/css/style.css");
      buildWidget();
      loadIssues();
      return renderForm();
    };
    loadIssues = function() {
      var _this = this;
      return $.ajax({
        url: "/issues",
        success: function(data) {
          return renderIssues(data);
        },
        dataType: "json"
      });
    };
    postIssue = function(issue) {
      var _this = this;
      return $.ajax({
        type: "POST",
        url: "/issues",
        dataType: "json",
        data: JSON.stringify(issue),
        success: function(data) {
          return expandIssue(data.id);
        }
      });
    };
    buildWidget = function() {
      var container, left_pane, modal_body, right_pane;
      container = $('<div>', {
        id: "git-satisfaction-modal"
      });
      container.append($('<div>', {
        id: "git-satisfaction-modal-background"
      }));
      modal_body = $('<div>', {
        id: "git-satisfaction-modal-body"
      });
      left_pane = $('<div>', {
        id: "git-satisfaction-left-pane"
      });
      left_pane.append($('<div>', {
        id: "git-satisfaction-pane-heading",
        text: "Existing issues:"
      }));
      left_pane.append($('<ul>', {
        id: "git-satisfaction-issue-list"
      }));
      right_pane = $('<div>', {
        id: "git-satisfaction-right-pane"
      });
      modal_body.append(left_pane);
      modal_body.append(right_pane);
      container.append(modal_body);
      return $('body').append(container);
    };
    renderIssues = function(issues) {
      var issue, issue_list, _j, _len1;
      issue_list = $('#git-satisfaction-issue-list');
      for (_j = 0, _len1 = issues.length; _j < _len1; _j++) {
        issue = issues[_j];
        dict[issue.id] = issue;
        issue_list.append($("<li>", {
          text: "" + issue.title + " (" + issue.num_subscribers + ")",
          id: issue.id,
          "class": "git-satisfaction-issue-li"
        }));
      }
      return $('.git-satisfaction-issue-li').on('click', function(e) {
        return expandIssue($(e.currentTarget).attr('id'));
      });
    };
    renderForm = function() {
      var form, right_pane,
        _this = this;
      right_pane = $('#git-satisfaction-right-pane');
      form = $('<form>', {
        id: "git-satisfaction-submit-form",
        text: "Create a new issue:"
      });
      form.append($('<input>', {
        id: "git-satisfaction-form-title",
        placeholder: "Enter your title here",
        name: "title"
      }));
      form.append($('<textarea>', {
        id: "git-satisfaction-form-body",
        placeholder: "Enter a new issue here",
        name: "body"
      }));
      form.append($('<button>', {
        id: "git-satisfaction-form-submit",
        text: "Submit",
        type: "submit"
      }));
      right_pane.html(form);
      return form.on('submit', function(e) {
        var inputs;
        e.preventDefault();
        inputs = {};
        inputs.title = $('#git-satisfaction-form-title').val();
        inputs.body = $('#git-satisfaction-form-body').val();
        return postIssue(inputs);
      });
    };
    expandIssue = function(id) {
      var issue, issue_holder, right_pane;
      issue = dict[id];
      right_pane = $('#git-satisfaction-right-pane');
      issue_holder = $('<div>', {
        id: "git-satisfaction-enlarged-issue"
      });
      issue_holder.append($('<p>', {
        "class": 'git-satisfaction-issue-title',
        text: issue.title
      }));
      issue_holder.append($('<p>', {
        "class": 'git-satisfaction-issue-num-voters',
        text: "" + issue.num_subscribers + " voters"
      }));
      issue_holder.append($('<p>', {
        "class": 'git-satisfaction-issue-body',
        text: issue.body
      }));
      return right_pane.html(issue_holder);
    };
    return removeListeners = function() {
      return $('#git-satisfaction-submit-form').off();
    };
  })();

}).call(this);
