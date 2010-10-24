require(__dirname + '/test-helper')
test('md5 authentication', function() {
  var client = createClient();
  client.password = "!";
  var salt = Buffer([1, 2, 3, 4]);
  client.connection.emit('authenticationMD5Password', {salt: salt});

  test('responds', function() {
    assert.length(client.stream.packets, 1);
    test('should have correct encrypted data', function() {
      var encrypted = client.md5(client.password + client.user);
      encrypted = client.md5(encrypted + salt.toString('binary'));
      var password = "md5" + encrypted
      //how do we want to test this?
      assert.equalBuffers(client.stream.packets[0], new BufferList()
                        .addCString(password).join(true,'p'))
    });
  });

});